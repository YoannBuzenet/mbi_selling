var express = require("express");
var router = express.Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const db = require("../../../models/index");
const securityCheckAPI = require("../../services/securityCheckAPI");
const axios = require("axios");
const mkmController = require("../../controllers/mkmController");
const definitionsAPI = require("../../../src/services/definitionsAPI");
const { prepareStateFromArrayOfRules } = require("../../services/utils");
const utils = require("../../services/utils");
const customRulesController = require("../../controllers/customRulesController");
const priceUpdateAPI = require("../../services/priceUpdateAPI");

router.post("/", async (req, res) => {
  /* ************************** */
  /* ****SECURITY & CHECKS**** */
  /* ************************ */

  securityCheckAPI.checkQueryParams(req, res, ["idShop", "idScript"]);

  let idShop = req.query.idShop;
  let idScript = req.query.idScript;

  let jwt = req.headers.authorization;

  if (jwt === undefined) {
    res.status(406).json("Auth Header is missing !");
    return;
  }

  //Check payload
  if (Object.keys(req.body).length === 0) {
    res.status(406).json("Script Execution payload is missing.");
    return;
  }
  if (req.body.formats === undefined) {
    res.status(406).json("Formats are mandatory to launch a Script Execution.");
    return;
  }
  if (!Array.isArray(req.body.formats)) {
    res.status(406).json("Formats must be an array.");
    return;
  }

  //Dictionnary of formats ID
  const allFormats = await db.Format.findAll();
  const reducer = (accumulator, currentValue) => [
    ...accumulator,
    currentValue.id,
  ];
  const arrayOfFormatId = allFormats.reduce(reducer, []);

  // console.log("arrayOfFormatId", arrayOfFormatId);

  //Does the formats passed in payload exist ? Let's check'em !
  for (let i = 0; i < req.body.formats.length; i++) {
    if (!arrayOfFormatId.includes(req.body.formats[i])) {
      res.status(406).json(`Formats n°${req.body.formats[i]} doesn't exist.`);
      return;
    }
  }

  // Check 3 : JWT
  // Auth delegation - checking if the account is a ROLE_ADMIN
  const isAdmin = await securityCheckAPI.checkIfUserIsThisOneOrAdmin(
    jwt,
    idShop
  );
  if (!isAdmin) {
    res.status(401).json("You don't have access to this ressource.");
    return;
  }

  //Script Existence Verification
  const scriptToCheck = await db.Script.findOne({
    where: {
      id: idScript,
    },
  });

  if (scriptToCheck === null) {
    res
      .status(401)
      .json("Script doesnt exist, or you don't have access to it.");
    return;
  }

  /* ************************** */
  /* ********* LOGIC ********** */
  /* ************************** */

  //Do we have already a stock for this user, and if yes, is it older than 24 hours ?

  const oneCardAtRandomFromStock = await db.MkmProduct.findOne({
    where: {
      idShop: idShop,
    },
  });

  /* **************************************** */
  /* *****Refreshing the stock if needed ******/
  /* **************************************** */

  if (
    oneCardAtRandomFromStock === null ||
    new Date(oneCardAtRandomFromStock.updatedAt).getTime() +
      process.env.TIME_TO_EXPIRE_STOCK <
      new Date().getTime()
  ) {
    console.log("We refresh the shop stock");
    let axiosConfig = {
      headers: {
        Authorization: req.headers.authorization,
      },
    };
    // on choppe les shopinfo sur mtgapi avec le jwt
    const shopdataRequest = await axios
      .get(process.env.REACT_APP_MTGAPI_URL + "/shops/" + idShop, axiosConfig)
      .catch((err) =>
        console.log("error when trying to get shop data from mtgAPI", err)
      );
    // console.log("shopdata from axios call", shopdataRequest);

    //on get le stock via MKM
    await mkmController.getShopStock(shopdataRequest.data, idShop);
  }

  console.log("we passed the stock refresh step");

  /* ******************************************* */
  /* Loading custom rules for the current Script */
  /* ******************************************* */

  const allCustomRules = await db.Custom_Rule.findAll({
    where: {
      idScript: idScript,
    },
    include: db.customRule_behaviour_definition,
  });
  // console.log("all custom rules", allCustomRules);

  //Ordering rules by price and foil/non Foil
  let orderedCustoMRules = prepareStateFromArrayOfRules(
    allCustomRules.map((customRule) => customRule.dataValues)
  );
  // console.log("ordered rules", orderedCustoMRules);

  // Check rule coherence : do rule price follow each other, if ruleType = X, is there a price
  // Browse the state, return a mutated state with the "incoherent" markets up to date.
  const browseScriptAndMarkIncoherence = (state) => {
    // console.log("search for incoherence");
    let mutatedState = { ...state };

    // console.log("search for incoherence in regular array");
    //Browsing Regular Array
    if (Array.isArray(mutatedState.regular)) {
      checkArrayIncoherence(mutatedState.regular);
    }
    // console.log("search for incoherence in foil array");
    //Browsing Foil Array
    if (Array.isArray(mutatedState.foil)) {
      checkArrayIncoherence(mutatedState.foil);
    }

    return mutatedState;
  };

  //We compare each rule to its next one and
  //1 Check that first price of the rule is inferior to the second price
  // 2. check if the number of sticking, thus creating no holes in the rule coverture
  const checkArrayIncoherence = (arrayOfCustomRules) => {
    if (Array.isArray(arrayOfCustomRules)) {
      for (let i = 0; i < arrayOfCustomRules.length; i++) {
        // console.log(
        //   "here is the rule we are working on",
        //   arrayOfCustomRules[i]
        // );

        //Check if starting value is 0
        if (i === 0 && arrayOfCustomRules[i].priceRangeFrom !== 0) {
          arrayOfCustomRules[i].hasIncoherentStartingPrice = true;
        } else {
          arrayOfCustomRules[i].hasIncoherentStartingPrice = false;
        }

        //We check if price are defined or if there is an empty place
        if (
          isNaN(parseInt(arrayOfCustomRules[i].priceRangeFrom)) ||
          isNaN(parseInt(arrayOfCustomRules[i].priceRangeTo))
        ) {
          arrayOfCustomRules[i].hasEmptyInput = true;
        } else {
          //If price are defined
          arrayOfCustomRules[i].hasEmptyInput = false;
          if (
            arrayOfCustomRules[i].priceRangeFrom >=
            arrayOfCustomRules[i].priceRangeTo
          ) {
            //Universal check : are price coherent (from < to) ?
            arrayOfCustomRules[i].hasIncoherentOrderInFromTo = true;
          } else {
            arrayOfCustomRules[i].hasIncoherentOrderInFromTo = false;
          }
          //Checking, if rule expect a price to sell, if this price is precised
          if (
            arrayOfCustomRules[i].ruleTypeId === 1 &&
            !Boolean(arrayOfCustomRules[i].priceRangeValueToSet)
          ) {
            arrayOfCustomRules[i].isMissingSellingPrice = true;
          } else {
            arrayOfCustomRules[i].isMissingSellingPrice = false;
          }
        }

        //We do this comparison only if it's NOT the last element of the array (because the next element doesn't exist, yeah !)
        if (i !== arrayOfCustomRules.length - 1) {
          if (
            arrayOfCustomRules[i].priceRangeTo !==
            arrayOfCustomRules[i + 1].priceRangeFrom
          ) {
            arrayOfCustomRules[i].hasIncoherentFollowingPrices = true;
          } else {
            arrayOfCustomRules[i].hasIncoherentFollowingPrices = false;
          }
        }
      }
      // console.log("treated array", arrayOfCustomRules);
      return arrayOfCustomRules;
    } else {
      throw new Error("Param received is not of type Array.");
    }
  };
  const canArrayOfCustomRulesBeProcessed = (currentState) => {
    return (
      currentState.foil.filter(
        (rule) =>
          rule.hasEmptyInput ||
          rule.hasIncoherentFollowingPrices ||
          rule.hasIncoherentOrderInFromTo ||
          rule.hasIncoherentStartingPrice ||
          rule.isMissingSellingPrice
      ).length === 0 &&
      currentState.regular.filter(
        (rule) =>
          rule.hasEmptyInput ||
          rule.hasIncoherentFollowingPrices ||
          rule.hasIncoherentOrderInFromTo ||
          rule.hasIncoherentStartingPrice ||
          rule.isMissingSellingPrice
      ).length === 0
    );
  };

  const rulesWithError = browseScriptAndMarkIncoherence(orderedCustoMRules);

  const IsArrayOfCustomRulesProcessable = canArrayOfCustomRulesBeProcessed(
    rulesWithError
  );

  console.log(
    "can array of rules be processed ?",
    IsArrayOfCustomRulesProcessable
  );

  if (!IsArrayOfCustomRulesProcessable) {
    console.log("rules with errors :", rulesWithError);

    res
      .status(500)
      .json("The custom rules are not coherent. Please check them.");
  }

  if (IsArrayOfCustomRulesProcessable) {
    /* **************************************** */
    /* ********** PUT REQUEST CREATION ***********/
    /* **************************************** */

    //Snapshot shop params for the current PUT Request
    const snapShop_Shop_Param = await utils.snapshotShopParams(idShop);

    const put_request = await db.PUT_Request.create({
      shopId: idShop,
      snapShotParamId: snapShop_Shop_Param.dataValues.id,
    });

    /* **************************************** */
    /* ********** Snapshot Custom Rule ***********/
    /* **************************************** */
    //Yo
    //TODO We must snapshot the rules
    //TODO For each one snapshoted, add its id in the object of the custom rule

    let snapshot_custom_rule;
    let idSnapShotCustomRule;

    for (let i = 0; i < orderedCustoMRules.regular.length; i++) {
      snapshot_custom_rule = await db.snapshot_custom_rules.create({
        idScript: idScript,
        ruleTypeId: orderedCustoMRules.regular[i].ruleTypeId,
        priceRangeFrom: orderedCustoMRules.regular[i].priceRangeFrom,
        priceRangeTo: orderedCustoMRules.regular[i].priceRangeTo,
        priceRangeValueToSet:
          orderedCustoMRules.regular[i].priceRangeValueToSet,
        behaviourId: orderedCustoMRules.regular[i].behaviourId,
        priceRangePercentageFromMkm:
          orderedCustoMRules.regular[i].priceRangePercentageFromMkm,
        mkmPriceGuideReference:
          orderedCustoMRules.regular[i].mkmPriceGuideReference,
        isForFoils: orderedCustoMRules.regular[i].isForFoils,
        isForSigned: orderedCustoMRules.regular[i].isForSigned,
        isForPlaysets: orderedCustoMRules.regular[i].isForPlaysets,
        PUT_Request_id: put_request.dataValues.id,
      });

      idSnapShotCustomRule = snapshot_custom_rule.dataValues.id;
      orderedCustoMRules.regular[i].idSnapShotCustomRule = idSnapShotCustomRule;
    }

    for (let i = 0; i < orderedCustoMRules.foil.length; i++) {
      snapshot_custom_rule = await db.snapshot_custom_rules.create({
        idScript: idScript,
        ruleTypeId: orderedCustoMRules.foil[i].ruleTypeId,
        priceRangeFrom: orderedCustoMRules.foil[i].priceRangeFrom,
        priceRangeTo: orderedCustoMRules.foil[i].priceRangeTo,
        priceRangeValueToSet: orderedCustoMRules.foil[i].priceRangeValueToSet,
        behaviourId: orderedCustoMRules.foil[i].behaviourId,
        priceRangePercentageFromMkm:
          orderedCustoMRules.foil[i].priceRangePercentageFromMkm,
        mkmPriceGuideReference:
          orderedCustoMRules.foil[i].mkmPriceGuideReference,
        isForFoils: orderedCustoMRules.foil[i].isForFoils,
        isForSigned: orderedCustoMRules.foil[i].isForSigned,
        isForPlaysets: orderedCustoMRules.foil[i].isForPlaysets,
        PUT_Request_id: put_request.dataValues.id,
      });

      idSnapShotCustomRule = snapshot_custom_rule.dataValues.id;
      orderedCustoMRules.foil[i].idSnapShotCustomRule = idSnapShotCustomRule;
    }

    /* **************************************** */
    /* ********** Chunk Management ***********/
    /* **************************************** */

    // Counting the number of cards concerned by this script

    //Building format dictionnary as a hashmap
    const formatDictionnary = await definitionsAPI.getFormatsAndReturnHashtable();

    let formatFilter = {};

    for (let i = 0; i < req.body.formats.length; i++) {
      formatFilter["isLegal" + formatDictionnary[req.body.formats[i]]] = 1;
    }

    // console.log("format filter", formatFilter);

    const numberOfCardsToHandle = await db.MkmProduct.findAndCountAll(
      {
        include: [
          {
            model: db.productLegalities,
            where: {
              [Op.or]: formatFilter,
            },
          },
        ],
        where: {
          idShop: idShop,
        },
      },
      {}
    );

    // Saving by chunks
    const chunkSize = 100;
    const numberOfIterations = Math.ceil(
      numberOfCardsToHandle.count / chunkSize
    );

    console.log(
      `--------with a chunk of ${chunkSize}, we will iterate ${numberOfIterations} times, because we are handling ${numberOfCardsToHandle.count} cards.`
    );

    for (let i = 0; i < numberOfIterations; i++) {
      //choper les 100 premières cartes (en ajusant offset à chaque iteration )
      const chunkOfCards = await db.MkmProduct.findAll(
        {
          include: [
            {
              model: db.productLegalities,
              where: {
                [Op.or]: formatFilter,
              },
            },
          ],
          where: {
            idShop: idShop,
          },
        },
        { offset: i * chunkSize, limit: chunkSize }
      );

      //Morphing the rules into an array of array with prices sorted, to make them browsable in log(n)
      const arrayOfSortedRulesRegular = customRulesController.transformCustomRulesIntoBrowsableArray(
        orderedCustoMRules.regular
      );
      const arrayOfSortedRulesFoil = customRulesController.transformCustomRulesIntoBrowsableArray(
        orderedCustoMRules.foil
      );

      let action;
      //For each card, we will process the price, check if we update it or not
      for (let j = 0; j < chunkOfCards.length; j++) {
        const card = chunkOfCards[j].dataValues;

        if (card.isFoil === 0) {
          action = priceUpdateAPI.findTheRightPriceRange(
            arrayOfSortedRulesRegular,
            card.price
          );
        } else if (card.isFoil === 1) {
          action = priceUpdateAPI.findTheRightPriceRange(
            arrayOfSortedRulesFoil,
            card.price
          );
        } else {
          res.status(500).json("A card was missing the isFoil prop.");
        }

        //We are getting all behaviours, we will need them whe processing the custom rules. This is an array
        const behaviourDefinitions = await db.customRule_behaviour_definition.findAll();

        //We transform the array into a dictionnary (hashmap) to browse it in constant time
        const customRulesBehaviourDictionnary = utils.transformArrayIntoDictionnaryWithKey(
          behaviourDefinitions.map((definition) => definition.dataValues)
        );

        console.log("reminder of the card", card);
        console.log("reminder of the card price", card.price);
        console.log("action for that card", action);

        // We chose to
        if (action === -2) {
          //Price is not updated : we just write it
          console.log("we are in action : -2");
          await db.put_memory.create({
            idScript: idScript,
            idProduct: card.idProduct,
            oldPrice: card.price,
            newPrice: card.price,
            condition: card.condition,
            lang: card.language,
            isFoil: card.isFoil,
            isSigned: card.isSigned,
            isPlayset: 0,
            behaviourChosen: "No corresponding Custom Rule",
            idCustomRuleUsed: action.idSnapShotCustomRule,
            PUT_Request_id: put_request.dataValues.id,
          });
        } else if (typeof action === "object") {
          console.log("we are in action : object");
          //yo

          if (action.ruleTypeId === 1) {
            console.log("we are in ruletype 1");
            // set value behaviour
            // get the price guide for this card
            const priceguide = await db.priceguide.findOne({
              where: {
                idProduct: card.idProduct,
              },
            });

            const newPrice = action.priceRangeValueToSet;

            let relevantTrend =
              card.isFoil === 0
                ? priceguide.dataValues.trendPrice
                : priceguide.dataValues.foilTrend;
            // priceshield

            if (
              priceUpdateAPI.priceShieldAllows(
                card.price,
                newPrice,
                relevantTrend
              )
            ) {
              // Price Shield allows the rule
              console.log("ruleType 1, price shield allowed");
              console.log("custom rule used", action.idSnapShotCustomRule);
              //PUT memory with change
              await db.put_memory.create({
                idScript: idScript,
                idProduct: card.idProduct,
                oldPrice: card.price,
                newPrice: newPrice,
                condition: card.condition,
                lang: card.language,
                isFoil: card.isFoil,
                isSigned: card.isSigned,
                isPlayset: 0,
                behaviourChosen: "Set Value",
                idCustomRuleUsed: action.idSnapShotCustomRule,
                PUT_Request_id: put_request.dataValues.id,
              });
            } else {
              console.log("ruleType 1, price shield blocked");
              // Price Shield blocked the rule
              await db.put_memory.create({
                idScript: idScript,
                idProduct: card.idProduct,
                oldPrice: card.price,
                newPrice: newPrice,
                condition: card.condition,
                lang: card.language,
                isFoil: card.isFoil,
                isSigned: card.isSigned,
                isPlayset: 0,
                behaviourChosen: "Price Shield Blocked",
                idCustomRuleUsed: action.idSnapShotCustomRule,
                PUT_Request_id: put_request.dataValues.id,
              });
            }
            // enregistrer dans put memory
          } else if (action.ruleTypeId === 2) {
            console.log("we are in ruletype 2");
            // mkm relou behaviour
            // get the price guide for this card
            const priceguide = await db.priceguide.findOne({
              where: {
                idProduct: card.idProduct,
              },
            });

            const actionName =
              action.customRule_behaviour_definition.dataValues.name;
            const actionType =
              action.customRule_behaviour_definition.dataValues.type;
            const actionSense =
              action.customRule_behaviour_definition.dataValues.sense;
            const actionCoefficient =
              action.customRule_behaviour_definition.dataValues.coefficient;

            //Browsing data on the rule to choose the right price to apply to the card
            if (actionType === "percent") {
              if (actionSense === "up") {
                //arrondir up %
              } else if (actionSense === "down") {
                //arrondir down %
              } else {
                throw new Error("No action sense (up or down) were precised.");
              }
            } else if (actionType === "number") {
              if (actionSense === "up") {
                //modulo up
              } else if (actionSense === "down") {
                //modulo down
              } else {
                throw new Error("No action sense (up or down) were precised.");
              }
            } else {
              throw new Error(
                "Action type wasn't precised on behaviour in custom rule."
              );
            }

            const newPrice = "TBD";

            let relevantTrend =
              card.isFoil === 0
                ? priceguide.dataValues.trendPrice
                : priceguide.dataValues.foilTrend;

            // priceshield
            if (
              priceUpdateAPI.priceShieldAllows(
                card.price,
                newPrice,
                relevantTrend
              )
            ) {
              //PUT memory with change
            } else {
              //PUT memory explaining why it didnt go for it
            }

            // enregistrer dans put memory
          } else if (action.ruleTypeId === 3) {
            console.log("we are in ruletype 3");
            // exclude
            await db.put_memory.create({
              idScript: idScript,
              idProduct: card.idProduct,
              oldPrice: card.price,
              newPrice: newPrice,
              condition: card.condition,
              lang: card.language,
              isFoil: card.isFoil,
              isSigned: card.isSigned,
              isPlayset: 0,
              behaviourChosen: "Excluded",
              idCustomRuleUsed: action.idSnapShotCustomRule,
              PUT_Request_id: put_request.dataValues.id,
            });
          }
        } else {
          console.log("No rule where found for the card", card);
          console.log("current action :", action);
          throw new Error("No adapted behaviour found for the currend card.");
        }

        //Ajouter la carte au chunk MKM
      }
      //Envoyer à MKM
    }

    //Générer le PDF à partir de put memory en passant l'id put request

    //Envoi Mail TO DO

    res.json("Script executed");
  }
});

module.exports = router;
