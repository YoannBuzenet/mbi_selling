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
const {
  transformConditionStringIntoInteger,
} = require("./genericDataController");
const PDFGeneration = require("../services/PDFGeneration");
const { sizeof } = require("../services/sizeof");

function generateBehaviourName(
  isPriceShieldBlocking,
  isExcluded,
  hasNoPriceGuide,
  hasNoCorrespondingCustomRule,
  behaviourBase,
  ruleTypeId
) {
  if (isPriceShieldBlocking) {
    if (ruleTypeId === 1) {
      return "Price Shield Blocked Set Value";
    } else {
      return "Price Shield Blocked " + behaviourBase;
    }
  } else if (isExcluded) {
    return "Excluded";
  } else if (hasNoPriceGuide) {
    return "No Corresponding Priceguide";
  } else if (hasNoCorrespondingCustomRule) {
    return "No corresponding Custom Rule";
  } else {
    if (ruleTypeId === 1) {
      return "Set Value";
    } else {
      return behaviourBase;
    }
  }
}

async function startScript(
  idShop,
  idScript,
  isTest,
  shopData,
  locale,
  formats,
  jwt
) {
  /* ************************** */
  /* ********* LOGIC ********** */
  /* ************************** */

  // kept those in comments for testing purpose, to see if queuing works
  // console.log("EXECUTING NEW SCRIPT", new Date());
  // await utils.sleep(50000);

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
      parseInt(process.env.TIME_TO_EXPIRE_STOCK, 10) <
      new Date().getTime()
  ) {
    console.log("We refresh the shop stock");
    let axiosConfig = {
      headers: {
        Authorization: jwt,
      },
    };
    // Getting shop data through the MTG API
    const shopdataRequest = await axios
      .get(process.env.REACT_APP_MTGAPI_URL + "/shops/" + idShop, axiosConfig)
      .catch((err) =>
        console.log("error when trying to get shop data from mtgAPI", err)
      );

    // Getting MKM stock and storing it in CSV
    try {
      await mkmController.getShopStock(shopdataRequest.data, idShop);
    } catch (e) {
      throw new Error("error while getting shop stock", e);
    }

    // Passing from CSV to DB
    try {
      await mkmController.registerStockFileIntoDB(idShop);
    } catch (e) {
      throw new Error(e);
    }
  } else {
    console.log("We do NOT refresh the shop stock");
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

  if (Array.isArray(allCustomRules) && allCustomRules.length === 0) {
    throw new Error("There must be at least one custom rule in the script.");
  }

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
    throw new Error("The custom rules are not coherent. Please check them.");
  }

  if (IsArrayOfCustomRulesProcessable) {
    /* **************************************** */
    /* ********** PUT REQUEST CREATION ***********/
    /* **************************************** */

    const put_request = await db.PUT_Request.create({
      idShop: idShop,
      isReal: isTest ? 0 : 1,
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
        locale,
        formats
      );
    } else {
      realScriptPersistingStep(
        orderedCustoMRules,
        idShop,
        idScript,
        put_request,
        snapShop_Shop_Param,
        shopData,
        locale,
        formats
      );
    }
  }
}

/* Parse each card in a custom rule and register it directly in DB afterwards. */
async function testScriptPersistingStep(
  orderedCustoMRules,
  idShop,
  idScript,
  put_request,
  snapShop_Shop_Param,
  locale,
  formats
) {
  /* **************************************** */
  /* ********** Chunk Management ***********/
  /* **************************************** */

  // Counting the number of cards concerned by this script

  //Building format dictionnary as a hashmap
  const formatDictionnary = await definitionsAPI.getFormatsAndReturnHashtable();

  let formatFilter = {};

  for (let i = 0; i < formats.length; i++) {
    formatFilter["isLegal" + formatDictionnary[formats[i]]] = 1;
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

  /* Shortcut to end the script */
  if (numberOfCardsToHandle.count === 0) {
    console.log("No MKM Product on this test script.");

    //TODO : mail qui explique que le stock contenait 0 cartes.
    // Marking PUT Request as successful
    await db.PUT_Request.markAsFinishedWith0MKMProducts(
      put_request.dataValues.id
    );

    // Marking Script as available
    await db.Script.markAsNotRunning(idScript);

    return;
  }

  //We are getting all MKM Priceguide Definition to be able to know which mkm price the user chose.
  const mkmPricesDefinitions = await db.PriceGuideDefinitions.findAll();

  //We transform the array into a dictionnary (hashmap) to browse it in constant time
  const mkmPricesGuideDictionnary = utils.transformArrayIntoDictionnaryWithKey(
    mkmPricesDefinitions.map((definition) => definition.dataValues)
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

      // If the card is Signed / Altered / Signed, we skip it.
      if (card.isSigned === 1 || card.isAltered === 1 || card.isPlayset === 1) {
        await db.put_memory.create({
          idScript: idScript,
          idProduct: card.idProduct,
          idArticle: card.idArticle,
          cardName: card.englishName,
          oldPrice: card.price,
          newPrice: card.price,
          condition: transformConditionStringIntoInteger(card.condition),
          lang: card.language,
          isFoil: card.isFoil,
          isSigned: card.isSigned,
          isPlayset: card.isPlayset,
          amount: card.amount,
          behaviourChosen: "Signed/Altered/Playset skipped",
          idCustomRuleUsed: 0,
          PUT_Request_id: put_request.dataValues.id,
        });
        continue;
      }

      // console.log("size of our card : ", sizeof(chunkOfCards[j]));

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
        throw new Error("A card was missing the isFoil prop.");
      }

      // console.log("reminder of the card", card);
      // console.log("action for that card", action);

      if (action === -2) {
        //Price is not updated : we just write it
        // console.log("we are in action : -2");
        await db.put_memory.create({
          idScript: idScript,
          idProduct: card.idProduct,
          idArticle: card.idArticle,
          cardName: card.englishName,
          oldPrice: card.price,
          newPrice: card.price,
          condition: transformConditionStringIntoInteger(card.condition),
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
          // console.log("we are in ruletype 1");
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
              condition: transformConditionStringIntoInteger(card.condition),
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
              condition: transformConditionStringIntoInteger(card.condition),
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
              // console.log("new price:", newPrice);
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
                condition: transformConditionStringIntoInteger(card.condition),
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
                condition: transformConditionStringIntoInteger(card.condition),
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
              condition: transformConditionStringIntoInteger(card.condition),
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
            priceShieldBlocked: 0,
            oldPrice: card.price,
            newPrice: card.price,
            condition: transformConditionStringIntoInteger(card.condition),
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
    }

    // Step End of Loop, nearly end of script

    // Marking PUT Request as successful
    await db.PUT_Request.markAsFinishedSuccessfully(put_request.dataValues.id);

    // Marking Script as available
    await db.Script.markAsNotRunning(idScript);

    await PDFGeneration.generatePDFFromPutRequest(
      put_request.dataValues.id,
      locale,
      true
    );

    // TO DO MAIL SENDING TO ADD
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
  locale,
  formats
) {
  console.log("MKM script this time !");

  /* **************************************** */
  /* ********** Chunk Management ***********/
  /* **************************************** */

  // Counting the number of cards concerned by this script

  //Building format dictionnary as a hashmap
  const formatDictionnary = await definitionsAPI.getFormatsAndReturnHashtable();

  let formatFilter = {};

  for (let i = 0; i < formats.length; i++) {
    formatFilter["isLegal" + formatDictionnary[formats[i]]] = 1;
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
  /* Shortcut to end the script */
  if (numberOfCardsToHandle.count === 0) {
    console.log("No MKM Product on this real script.");
    //TODO : mail qui explique que le stock contenait 0 cartes.

    // Marking PUT Request as successful
    await db.PUT_Request.markAsFinishedWith0MKMProducts(
      put_request.dataValues.id
    );

    // Marking Script as available
    await db.Script.markAsNotRunning(idScript);

    return;
  }

  // Saving by chunks
  const chunkSize = 100;
  const numberOfIterations = Math.ceil(numberOfCardsToHandle.count / chunkSize);

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

  const axiosConfigMKMHeader = {
    headers: { Authorization: mkmHeader },
  };

  //We are getting all MKM Priceguide Definition to be able to know which mkm price the user chose.
  const mkmPricesDefinitions = await db.PriceGuideDefinitions.findAll();

  //We transform the array into a dictionnary (hashmap) to browse it in constant time
  const mkmPricesGuideDictionnary = utils.transformArrayIntoDictionnaryWithKey(
    mkmPricesDefinitions.map((definition) => definition.dataValues)
  );

  for (let i = 0; i < numberOfIterations; i++) {
    // Working on a chunk of a 100 cards (MKM doesn't accept more)
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

      // If the card is Signed / Altered / Signed, we skip it.
      if (card.isSigned === 1 || card.isAltered === 1 || card.isPlayset === 1) {
        await db.put_memory.create({
          idScript: idScript,
          idProduct: card.idProduct,
          idArticle: card.idArticle,
          cardName: card.englishName,
          oldPrice: card.price,
          newPrice: card.price,
          condition: transformConditionStringIntoInteger(card.condition),
          lang: card.language,
          isFoil: card.isFoil,
          isSigned: card.isSigned,
          isPlayset: card.isPlayset,
          amount: card.amount,
          behaviourChosen: "Signed/Altered/Playset skipped",
          idCustomRuleUsed: 0,
          PUT_Request_id: put_request.dataValues.id,
        });
        continue;
      }

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
        throw new Error("A card was missing the isFoil prop.");
      }

      // console.log("reminder of the card", card);
      // console.log("action for that card", action);

      // Preparing the array that will be used for the MKM PUT
      // Adding data in the card
      chunkOfCards[j].action = action;
      chunkOfCards[j].relevantTrend = relevantTrend;

      // console.log("size of our card : ", sizeof(chunkOfCards[j]));

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
        let arrayOfCardsForXML = [];
        let arrayOfCardsSkippedAndDirectToDB = [];
        for (let k = 0; k < chunkOfCards.length; k++) {
          if (
            !chunkOfCards[k].hasOwnProperty("error") &&
            !chunkOfCards[k].hasOwnProperty("priceShieldBlocked") &&
            action.ruleTypeId !== 3
          ) {
            //There are no errors, no priceshield mention, and we are not using ruleType that exclude the cards : it can go to XML
            arrayOfCardsForXML = [...arrayOfCardsForXML, chunkOfCards[k]];
          } else {
            //There is some kind of error in here : it will be skipped for MKM and go direct to our DB
            arrayOfCardsSkippedAndDirectToDB = [
              ...arrayOfCardsSkippedAndDirectToDB,
              chunkOfCards[k],
            ];
          }
        }

        /* ****************************************** */
        /* ******* Sub Array 1 : Skipped cards ****** */
        /* ****************************************** */

        // Direct to DB

        for (let i = 0; i < arrayOfCardsSkippedAndDirectToDB.length; i++) {
          const behaviourChosen = generateBehaviourName(
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
              .customRule_behaviour_definition.dataValues.name,
            arrayOfCardsSkippedAndDirectToDB[i].action.ruleTypeId
          );

          await db.put_memory.registerAsSkippedCard(
            idScript,
            arrayOfCardsSkippedAndDirectToDB[i],
            arrayOfCardsSkippedAndDirectToDB[i].action.idSnapShotCustomRule,
            put_request.dataValues.id,
            behaviourChosen
          );
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
            axiosConfigMKMHeader
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

          // console.log("e", e);
          // console.log("e stringified", JSON.stringify(e));

          await updatedPUT_request.update({
            eventualMKM_ErrorMessage: e?.message || "mkm_error",
            lastIterationNumberWhenMKM_ErrorHappened: i,
          });

          // 2.
          for (let i = 0; i < arrayOfCardsForXML.length; i++) {
            await db.put_memory.registerAsFailure(
              idScript,
              arrayOfCardsForXML[i],
              arrayOfCardsForXML[i].action.idSnapShotCustomRule,
              put_request.dataValues.id
            );
          }

          // Stop script to avoid unnecessary computation
          return;
        }

        // In case of success, we register updates in DB
        for (let i = 0; i < arrayOfCardsForXML.length; i++) {
          await db.put_memory.registerAsSuccess(
            idScript,
            arrayOfCardsForXML[i],
            arrayOfCardsForXML[i].action.idSnapShotCustomRule,
            put_request.dataValues.id,
            generateBehaviourName(
              arrayOfCardsForXML[i].hasOwnProperty("priceShieldBlocked"),
              arrayOfCardsForXML[i].action.ruleType === 3,
              arrayOfCardsForXML[i].hasOwnProperty("hasNoPriceGuide"),
              arrayOfCardsForXML[i].hasOwnProperty("hasNoCustomRule"),
              arrayOfCardsForXML[i].action.customRule_behaviour_definition
                .dataValues.name,
              arrayOfCardsForXML[i].action.ruleTypeId
            )
          );
        }
        // We wait a bit before going to the next iteration to let the MKM API handle it.
        utils.sleep(parseInt(process.env.MKM_TIME_BETWEEN_LOOPS_ITERATIONS));
      }
    }
  }

  // Step End of Loop, nearly end of script

  // Marking PUT Request as successful
  await db.PUT_Request.markAsFinishedSuccessfully(put_request.dataValues.id);

  // Marking Script as available
  await db.Script.markAsNotRunning(idScript);

  await PDFGeneration.generatePDFFromPutRequest(
    put_request.dataValues.id,
    locale,
    false
  );

  // TO DO MAIL SENDING TO ADD
}

/* In case of emergency, allows to rewind a put request */
/* Function runing on the side of the queue for now, if necessary we will make one for it too. */
async function rewindPutRequest(put_requestToRewindId, shopData, idScript) {
  console.log("rewind put request : " + put_requestToRewindId);

  const put_request = await db.PUT_Request.create({
    idShop: shopData.id,
    isReal: 1,
    isRewind: 1,
  });

  const new_put_request_id = put_request.dataValues.id;

  // Loading all put_memories of target put_request that are not excluded or priceshieldBlocked
  const numberOfPut_Memory_To_Restore = await db.put_memory.findAndCountAll({
    where: {
      PUT_Request_id: put_requestToRewindId,
      priceShieldBlocked: 0,
      behaviourChosen: {
        [Op.not]: "Excluded",
      },
    },
  });

  // Saving by chunks
  const chunkSize = 100;
  const numberOfIterations = Math.ceil(
    numberOfPut_Memory_To_Restore.count / chunkSize
  );

  console.log("numberOfIterations", numberOfIterations);

  for (let i = 0; i < numberOfIterations; i++) {
    //Get the first 100 put_memories for this put request
    const chunkOfCards = await db.put_memory.findAll(
      {
        where: {
          PUT_Request_id: put_requestToRewindId,
          priceShieldBlocked: 0,
          behaviourChosen: {
            [Op.not]: "Excluded",
          },
        },
      },
      { offset: i * chunkSize, limit: chunkSize }
    );

    console.log("chunkOfCards", chunkOfCards);

    /* ****************************************** */
    /* ******* Preparing cards for MKM ****** */
    /* ****************************************** */

    const XMLPayload = mkmController.transformChunkOfCardsFromPutMemoryForRewindIntoXML(
      chunkOfCards
    );

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

    const axiosConfigMKMHeader = {
      headers: { Authorization: mkmHeader },
    };

    try {
      await axios.put(
        MkmAPI.URL_MKM_PUT_STOCK,
        XMLPayload,
        axiosConfigMKMHeader
      );
    } catch (e) {
      // In case failure, we record it in DB
      // 1. in the current put_request
      // 2. In put_memory for the last chunk

      // 1.
      const updatedPUT_request = await db.PUT_Request.findOne({
        where: {
          id: new_put_request_id,
        },
      });

      console.log("eeeee", e);
      console.log("e stringified", JSON.stringify(e));

      await updatedPUT_request.update({
        eventualMKM_ErrorMessage: e?.message || "mkm_error",
        lastIterationNumberWhenMKM_ErrorHappened: i,
      });

      // 2.
      for (let i = 0; i < chunkOfCards.length; i++) {
        await db.put_memory.registerAsFailureREWIND(
          idScript,
          chunkOfCards[i],
          new_put_request_id
        );
      }

      // Stop script to avoid unnecessary computation
      return;
    }

    // In case of success, we register updates in DB
    for (let i = 0; i < chunkOfCards.length; i++) {
      await db.put_memory.registerAsSuccessREWIND(
        idScript,
        chunkOfCards[i],
        new_put_request_id
      );
    }
    // We wait a bit before going to the next iteration to let the MKM API handle it.
    utils.sleep(parseInt(process.env.MKM_TIME_BETWEEN_LOOPS_ITERATIONS));
  }

  //in the end, complete put request
  // Marking PUT Request as successful
  await db.PUT_Request.markAsFinishedSuccessfully(new_put_request_id);
}

module.exports = {
  startScript,
  rewindPutRequest,
};
