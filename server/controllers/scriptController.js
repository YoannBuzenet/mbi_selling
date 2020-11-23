const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const db = require("../../models/index");
const axios = require("axios");
const mkmController = require("./mkmController");
const definitionsAPI = require("../../src/services/definitionsAPI");
const { prepareStateFromArrayOfRules } = require("../services/utils");
const utils = require("../services/utils");
const customRulesController = require("./customRulesController");
const priceUpdateAPI = require("../services/priceUpdateAPI");
const MkmAPI = require("../services/MkmAPI");
const put_memory = require("../../models/put_memory");

function generateBehaviourName(
  isPriceShieldBlocking,
  isExcluded,
  hasNoPriceGuide,
  hasNoCorrespondingCustomRule,
  behaviourBase
) {
  if (isPriceShieldBlocking) {
    return "Price Shield Blocked " + behaviourBase;
  } else if (isExcluded) {
    return "Excluded";
  } else if (hasNoPriceGuide) {
    return "No Corresponding Priceguide";
  } else if (hasNoCorrespondingCustomRule) {
    return "No corresponding Custom Rule";
  } else {
    return behaviourBase;
  }
}

async function startScript(idShop, idScript, isTest, shopData, req, res) {
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

    const put_request = await db.PUT_Request.create({
      idShop: idShop,
    });

    //Snapshot shop params for the current PUT Request
    const snapShop_Shop_Param = await utils.snapshotShopParams(
      idShop,
      put_request.dataValues.id
    );

    /* **************************************** */
    /* ********** Snapshot Custom Rule ***********/
    /* **************************************** */

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
    /* ********** Persistence Layer ***********/
    /* **************************************** */

    if (isTest) {
      testScriptPersistingStep(
        orderedCustoMRules,
        idShop,
        idScript,
        put_request,
        snapShop_Shop_Param,
        req,
        res
      );
    } else {
      realScriptPersistingStep(
        orderedCustoMRules,
        idShop,
        idScript,
        put_request,
        snapShop_Shop_Param,
        shopData,
        req,
        res
      );
    }

    res.json("Script executed");
  }
}

/* Parse each card in a custom rule and register it directly in DB afterwards. */
async function testScriptPersistingStep(
  orderedCustoMRules,
  idShop,
  idScript,
  put_request,
  snapShop_Shop_Param,
  req,
  res
) {
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
  const numberOfIterations = Math.ceil(numberOfCardsToHandle.count / chunkSize);

  // console.log(
  //   `--------with a chunk of ${chunkSize}, we will iterate ${numberOfIterations} times, because we are handling ${numberOfCardsToHandle.count} cards.`
  // );

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

      const priceguide = await db.priceguide.findOne({
        where: {
          idProduct: card.idProduct,
        },
      });

      let relevantTrend =
        card.isFoil === 0
          ? priceguide.dataValues.trendPrice
          : priceguide.dataValues.foilTrend;

      if (card.isFoil === 0) {
        action = priceUpdateAPI.findTheRightPriceRange(
          arrayOfSortedRulesRegular,
          relevantTrend
        );
      } else if (card.isFoil === 1) {
        action = priceUpdateAPI.findTheRightPriceRange(
          arrayOfSortedRulesFoil,
          relevantTrend
        );
      } else {
        res.status(500).json("A card was missing the isFoil prop.");
      }

      //We are getting all behaviours, we will need them when processing the custom rules. This is an array
      const behaviourDefinitions = await db.customRule_behaviour_definition.findAll();

      //We transform the array into a dictionnary (hashmap) to browse it in constant time
      const customRulesBehaviourDictionnary = utils.transformArrayIntoDictionnaryWithKey(
        behaviourDefinitions.map((definition) => definition.dataValues)
      );

      //We are getting all MKM Priceguide Definition to be able to know which mkm price the user chose.
      const mkmPricesDefinitions = await db.PriceGuideDefinitions.findAll();

      //We transform the array into a dictionnary (hashmap) to browse it in constant time
      const mkmPricesGuideDictionnary = utils.transformArrayIntoDictionnaryWithKey(
        mkmPricesDefinitions.map((definition) => definition.dataValues)
      );

      // console.log("reminder of the card", card);
      // console.log("action for that card", action);

      // We chose to
      if (action === -2) {
        //Price is not updated : we just write it
        console.log("we are in action : -2");
        await db.put_memory.create({
          idScript: idScript,
          idProduct: card.idProduct,
          idArticle: card.idArticle,
          cardName: card.englishName,
          oldPrice: card.price,
          newPrice: card.price,
          condition: card.condition,
          lang: card.language,
          isFoil: card.isFoil,
          isSigned: card.isSigned,
          isPlayset: 0,
          amount: card.amount,
          behaviourChosen: "No corresponding Custom Rule",
          idCustomRuleUsed: action.idSnapShotCustomRule,
          PUT_Request_id: put_request.dataValues.id,
        });
      } else if (typeof action === "object") {
        if (action.ruleTypeId === 1) {
          console.log("we are in ruletype 1");
          // set value behaviour
          // get the price guide for this card

          let newPrice = action.priceRangeValueToSet;

          // We update the price depending on condition and language of the card, with shop params
          newPrice = priceUpdateAPI.calculatePriceWithLanguageAndConditionSpecifics(
            newPrice,
            card.language,
            card.condition,
            card.isFoil,
            snapShop_Shop_Param.dataValues
          );

          //After price was defined, we pass it into the price shield
          const priceShieldTest = priceUpdateAPI.priceShieldAllows(
            card.price,
            newPrice,
            relevantTrend,
            card.condition
          );

          // priceshield
          if (priceShieldTest.result) {
            // Price Shield allows the rule
            //PUT memory with change
            await db.put_memory.create({
              idScript: idScript,
              idProduct: card.idProduct,
              idArticle: card.idArticle,
              cardName: card.englishName,
              oldPrice: card.price,
              newPrice: newPrice,
              priceShieldBlocked: 0,
              regularCardsTrend: card.isFoil === 0 ? relevantTrend : null,
              foilCardsTrend: card.isFoil === 0 ? null : relevantTrend,
              condition: card.condition,
              lang: card.language,
              isFoil: card.isFoil,
              isSigned: card.isSigned,
              amount: card.amount,
              isPlayset: 0,
              behaviourChosen: "Set Value",
              idCustomRuleUsed: action.idSnapShotCustomRule,
              PUT_Request_id: put_request.dataValues.id,
            });
          } else {
            // Price Shield blocked the rule
            await db.put_memory.create({
              idScript: idScript,
              idProduct: card.idProduct,
              idArticle: card.idArticle,
              cardName: card.englishName,
              regularCardsTrend: card.isFoil === 0 ? relevantTrend : null,
              foilCardsTrend: card.isFoil === 0 ? null : relevantTrend,
              oldPrice: card.price,
              newPrice: newPrice,
              priceShieldBlocked: 1,
              priceShieldReason: priceShieldTest.reason,
              condition: card.condition,
              lang: card.language,
              isFoil: card.isFoil,
              isSigned: card.isSigned,
              isPlayset: 0,
              amount: card.amount,
              behaviourChosen: "Price Shield Blocked Set Value",
              idCustomRuleUsed: action.idSnapShotCustomRule,
              PUT_Request_id: put_request.dataValues.id,
            });
          }
        } else if (action.ruleTypeId === 2) {
          // Mkm based behaviour action
          // get the price guide for this card

          // console.log(
          //   "price guide for this card, mkm step",
          //   priceguide.dataValues
          // );

          const actionName =
            action.customRule_behaviour_definition.dataValues.name;
          const actionType =
            action.customRule_behaviour_definition.dataValues.type;
          const actionSense =
            action.customRule_behaviour_definition.dataValues.sense;
          const actionCoefficient =
            action.customRule_behaviour_definition.dataValues.coefficient;

          let newPrice;
          let priceguideRefUsedByUser =
            priceguide.dataValues[
              mkmPricesGuideDictionnary[action.mkmPriceGuideReference].name
            ];

          //We check if this price exist (price guide is sometimes empty) before trying to work with it.

          if (priceguideRefUsedByUser) {
            //If the priceguide does exist, we will define the new price thanks to the operation criteria
            // Then, pass it in the price shield at the end

            if (actionType === "percent") {
              //Browsing data on the rule to choose the right price to apply to the card

              if (actionSense === "up") {
                //Round up in % the number chosen in reference
                newPrice = priceUpdateAPI.roundUpPercent(
                  priceguideRefUsedByUser,
                  actionCoefficient
                );
              } else if (actionSense === "down") {
                //arrondir down %
                newPrice = priceUpdateAPI.roundDownPercent(
                  priceguideRefUsedByUser,
                  actionCoefficient
                );
              } else {
                throw new Error("No action sense (up or down) were precised.");
              }
            } else if (actionType === "number") {
              if (actionSense === "up") {
                //modulo up
                newPrice = priceUpdateAPI.roundUpNumber(
                  priceguideRefUsedByUser,
                  actionCoefficient
                );
              } else if (actionSense === "down") {
                //modulo down
                newPrice = priceUpdateAPI.roundDownNumber(
                  priceguideRefUsedByUser,
                  actionCoefficient
                );
              } else {
                throw new Error("No action sense (up or down) were precised.");
              }
            } else {
              throw new Error(
                "Action type wasn't precised on behaviour in custom rule."
              );
            }

            // We update the price depending on condition and language of the card, with shop params
            newPrice = priceUpdateAPI.calculatePriceWithLanguageAndConditionSpecifics(
              newPrice,
              card.language,
              card.condition,
              card.isFoil,
              snapShop_Shop_Param.dataValues
            );

            //After price was defined, we pass it into the price shield

            const priceShieldTest = priceUpdateAPI.priceShieldAllows(
              card.price,
              newPrice,
              priceguideRefUsedByUser,
              card.condition
            );
            if (priceShieldTest.result) {
              // console.log("new price :", newPrice);
              //PUT memory with change
              //Save with new price
              await db.put_memory.create({
                idScript: idScript,
                idProduct: card.idProduct,
                idArticle: card.idArticle,
                cardName: card.englishName,
                regularCardsTrend: card.isFoil === 0 ? relevantTrend : null,
                foilCardsTrend: card.isFoil === 0 ? null : relevantTrend,
                oldPrice: card.price,
                newPrice: newPrice,
                numberUserChoseToUse: priceguideRefUsedByUser,
                priceShieldBlocked: 0,
                priceShieldReason: null,
                condition: card.condition,
                lang: card.language,
                isFoil: card.isFoil,
                isSigned: card.isSigned,
                isPlayset: 0,
                amount: card.amount,
                behaviourChosen: actionName,
                idCustomRuleUsed: action.idSnapShotCustomRule,
                PUT_Request_id: put_request.dataValues.id,
              });
            } else {
              //PUT memory explaining why it didnt go for it
              await db.put_memory.create({
                idScript: idScript,
                idProduct: card.idProduct,
                idArticle: card.idArticle,
                cardName: card.englishName,
                regularCardsTrend: card.isFoil === 0 ? relevantTrend : null,
                foilCardsTrend: card.isFoil === 0 ? null : relevantTrend,
                oldPrice: card.price,
                newPrice: newPrice,
                numberUserChoseToUse: priceguideRefUsedByUser,
                priceShieldBlocked: 1,
                priceShieldReason: priceShieldTest.reason,
                condition: card.condition,
                lang: card.language,
                isFoil: card.isFoil,
                isSigned: card.isSigned,
                isPlayset: 0,
                amount: card.amount,
                behaviourChosen: "Price Shield Blocked " + actionName,
                idCustomRuleUsed: action.idSnapShotCustomRule,
                PUT_Request_id: put_request.dataValues.id,
              });
            }
          } else {
            //The price did not exist in the price guide, so we do not change it and mark it in Put memory.
            //Save same as actual in put memory with mention "No Corresponding Priceguide"
            await db.put_memory.create({
              idScript: idScript,
              idProduct: card.idProduct,
              idArticle: card.idArticle,
              cardName: card.englishName,
              oldPrice: card.price,
              newPrice: card.price,
              condition: card.condition,
              lang: card.language,
              isFoil: card.isFoil,
              isSigned: card.isSigned,
              isPlayset: 0,
              amount: card.amount,
              behaviourChosen: "No Corresponding Priceguide",
              idCustomRuleUsed: action.idSnapShotCustomRule,
              PUT_Request_id: put_request.dataValues.id,
            });
          }
        } else if (action.ruleTypeId === 3) {
          console.log("we are in ruletype 3");
          // exclude
          await db.put_memory.create({
            idScript: idScript,
            idProduct: card.idProduct,
            idArticle: card.idArticle,
            cardName: card.englishName,
            regularCardsTrend: card.isFoil === 0 ? relevantTrend : null,
            foilCardsTrend: card.isFoil === 0 ? null : relevantTrend,
            oldPrice: card.price,
            newPrice: card.price,
            condition: card.condition,
            lang: card.language,
            isFoil: card.isFoil,
            isSigned: card.isSigned,
            isPlayset: 0,
            amount: card.amount,
            behaviourChosen: "Excluded",
            idCustomRuleUsed: action.idSnapShotCustomRule,
            PUT_Request_id: put_request.dataValues.id,
          });
        }
      } else {
        throw new Error("No adapted behaviour found for the current card.");
      }

      //Ajouter la carte au chunk MKM ici dans l'autre fct
    }
  }
}

/* Parse each card in a custom rule, then PUT it in MKM by chunk of 100, and register it in DB if it was a success. */
async function realScriptPersistingStep(
  orderedCustoMRules,
  idShop,
  idScript,
  put_request,
  snapShop_Shop_Param,
  shopData,
  req,
  res
) {
  console.log("MKM script this time !");

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
  const numberOfIterations = Math.ceil(numberOfCardsToHandle.count / chunkSize);

  // console.log(
  //   `--------with a chunk of ${chunkSize}, we will iterate ${numberOfIterations} times, because we are handling ${numberOfCardsToHandle.count} cards.`
  // );

  /* **************************************** */
  /* *************** MKM HEADER ***************/
  /* **************************************** */

  const mkmHeader = MkmAPI.buildOAuthHeader(
    "PUT",
    MkmAPI.URL_MKM_PUT_STOCK,
    shopData.appToken,
    shopData.appSecret,
    shopData.accessToken,
    shopData.accessSecret
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

      const priceguide = await db.priceguide.findOne({
        where: {
          idProduct: card.idProduct,
        },
      });

      let relevantTrend =
        card.isFoil === 0
          ? priceguide.dataValues.trendPrice
          : priceguide.dataValues.foilTrend;

      if (card.isFoil === 0) {
        action = priceUpdateAPI.findTheRightPriceRange(
          arrayOfSortedRulesRegular,
          relevantTrend
        );
      } else if (card.isFoil === 1) {
        action = priceUpdateAPI.findTheRightPriceRange(
          arrayOfSortedRulesFoil,
          relevantTrend
        );
      } else {
        res.status(500).json("A card was missing the isFoil prop.");
      }

      //We are getting all behaviours, we will need them when processing the custom rules. This is an array
      const behaviourDefinitions = await db.customRule_behaviour_definition.findAll();

      //We transform the array into a dictionnary (hashmap) to browse it in constant time
      const customRulesBehaviourDictionnary = utils.transformArrayIntoDictionnaryWithKey(
        behaviourDefinitions.map((definition) => definition.dataValues)
      );

      //We are getting all MKM Priceguide Definition to be able to know which mkm price the user chose.
      const mkmPricesDefinitions = await db.PriceGuideDefinitions.findAll();

      //We transform the array into a dictionnary (hashmap) to browse it in constant time
      const mkmPricesGuideDictionnary = utils.transformArrayIntoDictionnaryWithKey(
        mkmPricesDefinitions.map((definition) => definition.dataValues)
      );

      // console.log("reminder of the card", card);
      // console.log("action for that card", action);

      // Preparing the array that will be used for the MKM PUT
      // Adding the action data in the card
      chunkOfCards[j].action = action;

      /* ***************************************************** */
      /* Calculating the newPrice depending on the used rule   */
      /* ***************************************************** */

      let newPrice;
      if (action.ruleTypeId === 1) {
        //Set Value

        newPrice = action.priceRangeValueToSet;
      } else if (action.ruleTypeId === 2) {
        // MKM based action
        const actionName =
          action.customRule_behaviour_definition.dataValues.name;
        const actionType =
          action.customRule_behaviour_definition.dataValues.type;
        const actionSense =
          action.customRule_behaviour_definition.dataValues.sense;
        const actionCoefficient =
          action.customRule_behaviour_definition.dataValues.coefficient;

        let priceguideRefUsedByUser =
          priceguide.dataValues[
            mkmPricesGuideDictionnary[action.mkmPriceGuideReference].name
          ];

        if (priceguideRefUsedByUser) {
          if (actionType === "percent") {
            //Browsing data on the rule to choose the right price to apply to the card

            if (actionSense === "up") {
              //Round up in % the number chosen in reference
              newPrice = priceUpdateAPI.roundUpPercent(
                priceguideRefUsedByUser,
                actionCoefficient
              );
            } else if (actionSense === "down") {
              //arrondir down %
              newPrice = priceUpdateAPI.roundDownPercent(
                priceguideRefUsedByUser,
                actionCoefficient
              );
            } else {
              throw new Error("No action sense (up or down) were precised.");
            }
          } else if (actionType === "number") {
            if (actionSense === "up") {
              //modulo up
              newPrice = priceUpdateAPI.roundUpNumber(
                priceguideRefUsedByUser,
                actionCoefficient
              );
            } else if (actionSense === "down") {
              //modulo down
              newPrice = priceUpdateAPI.roundDownNumber(
                priceguideRefUsedByUser,
                actionCoefficient
              );
            } else {
              throw new Error("No action sense (up or down) were precised.");
            }
          } else {
            throw new Error(
              "Action type wasn't precised on behaviour in custom rule."
            );
          }
        } else {
          chunkOfCards[j].hasNoPriceGuide = "No priceguide for this card.";
        }
      } else if (action.ruleTypeId === 3) {
        // We don't do anything here, as we will just register directly the card in DB without sending it to MKM.
      } else if (action.ruleTypeId === -2) {
        chunkOfCards[j].hasNoCustomRule = "No Custom Rule for this card.";
      }

      // We update the price depending on condition and language of the card, with shop params
      newPrice = priceUpdateAPI.calculatePriceWithLanguageAndConditionSpecifics(
        newPrice,
        card.language,
        card.condition,
        card.isFoil,
        snapShop_Shop_Param.dataValues
      );

      //Setting the price and keeping track of it
      chunkOfCards[j].newPrice = newPrice;

      //After price was defined, we pass it into the price shield
      const priceShieldTest = priceUpdateAPI.priceShieldAllows(
        chunkOfCards[j].price,
        newPrice,
        relevantTrend,
        chunkOfCards[j].condition
      );

      if (!priceShieldTest.result) {
        chunkOfCards[j].priceShieldBlocked = "Blocked by PriceShield";
        chunkOfCards[j].priceShieldReason = priceShieldTest.reason;
      }

      /* ***************************************************** */
      /* Last iteration of the chunk : we create 2 sub arrays   */
      /* ***************************************************** */

      // One for the skipped cards that goes directly in DB, one for the MKM request

      if (chunkOfCards.length === j + 1) {
        const arrayOfCardsForXML = [];
        const arrayOfCardsSkippedAndDirectToDB = [];
        for (let k = 0; k < chunkOfCards.length; k++) {
          if (
            !chunkOfCards[j].error ||
            !chunkOfCards[j].priceShieldBlocked ||
            action.ruleTypeId !== 3
          ) {
            //There are no errors, no priceshield mention, and we are not using ruleType that exclude the cards : it can go to XML
            arrayOfCardsForXML = [...arrayOfCardsForXML, chunkOfCards[j]];
          } else {
            //There is some kind of error in here : it will be skipped for MKM and go direct to our DB
            arrayOfCardsSkippedAndDirectToDB = [
              ...arrayOfCardsSkippedAndDirectToDB,
              chunkOfCards[j],
            ];
          }
        }

        /* ****************************************** */
        /* ******* Sub Array 1 : Skipped cards ****** */
        /* ****************************************** */

        // Direct to DB

        for (let i = 0; i < arrayOfCardsSkippedAndDirectToDB.length; i++) {
          const newPutMemory = await db.put_memory.create({
            idScript: idScript,
            idProduct: arrayOfCardsSkippedAndDirectToDB[i].idProduct,
            idArticle: arrayOfCardsSkippedAndDirectToDB[i].idArticle,
            cardName: arrayOfCardsSkippedAndDirectToDB[i].englishName,
            oldPrice: arrayOfCardsSkippedAndDirectToDB[i].price,
            newPrice: arrayOfCardsSkippedAndDirectToDB[i].price,
            condition: arrayOfCardsSkippedAndDirectToDB[i].condition,
            lang: arrayOfCardsSkippedAndDirectToDB[i].language,
            isFoil: arrayOfCardsSkippedAndDirectToDB[i].isFoil,
            isSigned: arrayOfCardsSkippedAndDirectToDB[i].isSigned,
            isPlayset: 0,
            amount: arrayOfCardsSkippedAndDirectToDB[i].amount,
            behaviourChosen: generateBehaviourName(
              arrayOfCardsSkippedAndDirectToDB[i].hasOwnProperty(
                "priceShieldBlocked"
              ),
              arrayOfCardsSkippedAndDirectToDB[i].action.ruleType === 3,
              arrayOfCardsSkippedAndDirectToDB[i].hasOwnProperty(
                "hasNoPriceGuide"
              ),
              arrayOfCardsSkippedAndDirectToDB[i].hasOwnProperty(
                "hasNoCustomRule"
              ),
              arrayOfCardsSkippedAndDirectToDB[i].action
                .customRule_behaviour_definition.dataValues.name
            ),
            idCustomRuleUsed:
              arrayOfCardsSkippedAndDirectToDB[i].action.idSnapShotCustomRule,
            PUT_Request_id: put_request.dataValues.id,
          });
        }

        /* ****************************************** */
        /* ******* Sub Array 2 : cards for MKM ****** */
        /* ****************************************** */

        // XML Creation

        const XML_payload_Put_Request = mkmController.transformChunkOfCardsAndActionsIntoXML(
          arrayOfCardsForXML
        );

        try {
          await axios.put(
            MkmAPI.URL_MKM_PUT_STOCK,
            XML_payload_Put_Request,
            mkmHeader
          );
        } catch (e) {
          // In case failure, we record it in DB
          // 1. in the current put_request
          // 2. In put_memory for the last chunk

          // 1.
          const updatedPUT_request = await db.PUT_Request.findOne({
            where: {
              id: put_request.dataValues.id,
            },
          });
          await updatedPUT_request.update({
            eventualMKM_ErrorMessage: e.response.data || "mkm_error",
            lastIterationNumberWhenMKM_ErrorHappened: i,
          });

          // 2.
          for (let i = 0; i < XML_payload_Put_Request.length; i++) {
            await db.put_memory.registerAsFailure(
              idScript,
              XML_payload_Put_Request[i],
              XML_payload_Put_Request[i].action.idSnapShotCustomRule,
              put_request.dataValues.id
            );
          }
          // Stop script to avoid unnecessary computation
          return;
        }

        // Yo
        // NEXT
        // Si succès, register in DB as a success

        // await X milliseconds avant la prochaine iteration
      }
    }
  }
}

module.exports = {
  startScript,
};
