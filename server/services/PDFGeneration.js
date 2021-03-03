var PdfPrinter = require("pdfmake");
var fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const db = require("../../models");
const moment = require("moment");
const {
  translation,
} = require("../../src/services/fullstackTranslations/formatDate");
const utils = require("../../src/services/utils");
const utilsServer = require("../services/utils");
const priceshieldTranslations = require("../../src/services/fullstackTranslations/priceshieldTranslations");
const genericTranslations = require("../../src/services/fullstackTranslations/genericTranslations");

// Adding this function because we will be counting decimals, to be sure to not round something unvoluntarily
Number.prototype.countDecimals = function () {
  if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
  return this.toString().split(".")[1].length || 0;
};

async function generatePDFFromPutRequest(
  put_requestId,
  idScript,
  langLocale = "en-US",
  isTestScript = true,
  printExplaination = false,
  hasPricedBasedOn = "mkmTrends"
) {
  // The PDF was supposed to print a line of explaination for each line of data. This feature has been stopped without being finished.
  // If you wish to pass printExplaination parameter to true, just finish the function that generate translated text with relevant data for each line.

  /* ******************************* */
  /* ******* GETTING CONTENT ******* */
  /* ****************************** */

  const put_request = await db.PUT_Request.findOne({
    where: {
      id: put_requestId,
    },
  });

  const all_put_memories = await db.put_memory.findAndCountAll({
    where: {
      PUT_Request_id: put_requestId,
    },
  });

  const currentScript = await db.Script.findOne({
    where: {
      id: idScript,
    },
  });

  const usedFormats = await currentScript.getFormats();

  const all_higher_price_put_memories = await db.put_memory.findAndCountAll({
    where: {
      PUT_Request_id: put_requestId,
      newPrice: {
        [Op.gt]: Sequelize.col("oldPrice"),
      },
      priceShieldBlocked: 0,
      behaviourChosen: {
        [Op.notLike]: "%Excluded%",
      },
    },
  });

  const all_lower_price_put_memories = await db.put_memory.findAndCountAll({
    where: {
      PUT_Request_id: put_requestId,
      newPrice: {
        [Op.lt]: Sequelize.col("oldPrice"),
      },
      priceShieldBlocked: 0,
      behaviourChosen: {
        [Op.notLike]: "%Excluded%",
      },
    },
  });

  const all_priceShield_blocked_put_memories = await db.put_memory.findAndCountAll(
    {
      where: {
        PUT_Request_id: put_requestId,
        priceShieldBlocked: 1,
      },
    }
  );

  const all_excluded_put_memories = await db.put_memory.findAndCountAll({
    where: {
      PUT_Request_id: put_requestId,
      behaviourChosen: {
        [Op.or]: {
          [Op.like]: "%Signed%",
          [Op.like]: "%Altered%",
          [Op.like]: "%Playset%",
          [Op.like]: "%Excluded%",
        },
      },
    },
  });

  /* ***************************** */
  /* **** Getting Definitions **** */
  /* ***************************** */

  //We are getting all rules, we will need them when processing the custom rules. This is an array
  const ruleTypesDefinitions = await db.customRule_ruleType_definition.findAll();

  //We transform the array into a dictionnary (hashmap) to browse it in constant time
  const ruleTypesDefinitionsDictionnary = utilsServer.transformArrayIntoDictionnaryWithKey(
    ruleTypesDefinitions.map((definition) => definition.dataValues)
  );
  //We are getting all behaviours, we will need them when processing the custom rules. This is an array
  const behaviourDefinitions = await db.customRule_behaviour_definition.findAll();

  //We transform the array into a dictionnary (hashmap) to browse it in constant time
  const customRulesBehaviourDictionnary = utilsServer.transformArrayIntoDictionnaryWithKey(
    behaviourDefinitions.map((definition) => definition.dataValues)
  );

  //We are getting all MKM Priceguide Definition to be able to know which mkm price the user chose.
  const mkmPricesDefinitions = await db.PriceGuideDefinitions.findAll();

  //We transform the array into a dictionnary (hashmap) to browse it in constant time
  const mkmPricesGuideDictionnary = utilsServer.transformArrayIntoDictionnaryWithKey(
    mkmPricesDefinitions.map((definition) => definition.dataValues)
  );

  /* ***************************** */
  /* Getting snapshot custom rules */
  /* ***************************** */

  const all_snapshot_custom_rules = await db.snapshot_custom_rules.findAll({
    where: {
      PUT_Request_id: put_requestId,
    },
  });

  const snapshotCustomRulesCurrentValue = all_snapshot_custom_rules.map(
    (sequelizeFormat) => sequelizeFormat.dataValues
  );

  const orderedSnapshotCustomRules = utilsServer.prepareStateFromArrayOfRules(
    snapshotCustomRulesCurrentValue
  );

  /* **************************** */
  /* Getting snapshot shop params */
  /* **************************** */

  const snapshotShopParams = await db.snapshot_params.findOne({
    where: {
      PUT_Request_id: put_requestId,
    },
  });

  /* **************************** */
  /* Getting snapshot key words */
  /* **************************** */

  const snapshotKeywords = await db.snapshot_keyword.findAll({
    where: {
      PUT_Request_id: put_requestId,
    },
  });

  /* ****************************** */
  /*  PUT request keyword behaviour */
  /* ****************************** */

  const putRequestKeywordBehaviour = put_request.dataValues.keywordBehaviour;

  /* **************************** */
  /* Getting snapshot rarities */
  /* **************************** */
  const snapshotRarities = await db.snapshot_rarity.findAll({
    where: {
      PUT_Request_id: put_requestId,
    },
  });

  /* **************************** */
  /* Getting snapshot expansions */
  /* **************************** */
  const snapshotExpansions = await db.snapshot_expansion.findAll({
    where: {
      PUT_Request_id: put_requestId,
    },
  });

  // https://pdfmake.github.io/docs/document-definition-object/tables/
  // http://pdfmake.org/playground.html

  var fonts = {
    Roboto: {
      normal:
        "node_modules/roboto-font/fonts/Roboto/roboto-regular-webfont.ttf",
      bold: "node_modules/roboto-font/fonts/Roboto/roboto-bold-webfont.ttf",
      italics:
        "node_modules/roboto-font/fonts/Roboto/roboto-italic-webfont.ttf",
      bolditalics:
        "node_modules/roboto-font/fonts/Roboto/roboto-bolditalic-webfont.ttf",
    },
  };

  function generateFooter(currentPage, pageCount) {
    return [
      {
        text:
          genericTranslations.pdfStructure.page[langLocale] +
          currentPage.toString() +
          " / " +
          pageCount,
        style: "footer",
      },
      { text: "MKM Price Updater", style: "footerMention" },
      { text: "www.mtginterface.com", style: "footerMention" },
    ];
  }

  // prepare to enrich this function if explaination feature is asked by customer
  function generateLineHigherPriceCard(data, shouldPrintExplaination) {
    let arrayWithAllData = [];

    const sortedData = data.rows.sort(utilsServer.compareByCardName);

    for (let i = 0; i < sortedData.length; i++) {
      if (shouldPrintExplaination) {
        //Here we print all details

        arrayWithAllData = [
          ...arrayWithAllData,
          [
            sortedData[i].cardName,
            sortedData[i].isFoil === 1
              ? genericTranslations.pdfStructure.yes[langLocale]
              : genericTranslations.pdfStructure.no[langLocale],
            utilsServer.conditionDefinition[sortedData[i].condition],
            utilsServer.langDefinition[sortedData[i].lang][langLocale],
            sortedData[i].oldPrice
              ? sortedData[i].oldPrice.toFixed(2) + " €"
              : sortedData[i].oldPrice,
            sortedData[i].newPrice
              ? sortedData[i].newPrice.toFixed(2) + " €"
              : sortedData[i].newPrice,
            sortedData[i].regularCardsTrend
              ? sortedData[i].regularCardsTrend.toFixed(2) + " €"
              : sortedData[i].regularCardsTrend,
            sortedData[i].foilCardsTrend
              ? sortedData[i].foilCardsTrend.toFixed(2) + " €"
              : sortedData[i].foilCardsTrend,
            sortedData[i].idArticle,
          ],
          [
            {
              colSpan: 10,
              text: "TBD if explaination is used one day",
            },
          ],
        ];
      } else {
        //Here we just print the normal line
        arrayWithAllData = [
          ...arrayWithAllData,
          [
            sortedData[i].cardName,
            sortedData[i].isFoil === 1
              ? genericTranslations.pdfStructure.yes[langLocale]
              : genericTranslations.pdfStructure.no[langLocale],
            utilsServer.conditionDefinition[sortedData[i].condition],
            utilsServer.langDefinition[sortedData[i].lang][langLocale],
            {
              text: sortedData[i].oldPrice
                ? sortedData[i].oldPrice.toFixed(2) + " €"
                : sortedData[i].oldPrice,
              style: "alignRight",
            },
            {
              text: sortedData[i].newPrice
                ? sortedData[i].newPrice.toFixed(2) + " €"
                : sortedData[i].newPrice,
              style: "alignRight",
            },
            {
              text: sortedData[i].regularCardsTrend
                ? sortedData[i].regularCardsTrend.toFixed(2) + " €"
                : sortedData[i].regularCardsTrend,
              style: "alignRight",
            },
            {
              text: sortedData[i].foilCardsTrend
                ? sortedData[i].foilCardsTrend.toFixed(2) + " €"
                : sortedData[i].foilCardsTrend,
              style: "alignRight",
            },
            { text: sortedData[i].idArticle, style: "alignRight" },
          ],
        ];
      }
    }

    return arrayWithAllData;
  }

  function generateLineLowerPriceCard(data, shouldPrintExplaination) {
    const sortedData = data.rows.sort(utilsServer.compareByCardName);

    let arrayWithAllData = [];

    for (let i = 0; i < data.rows.length; i++) {
      if (shouldPrintExplaination) {
        //Here we print all details

        arrayWithAllData = [
          ...arrayWithAllData,
          [
            sortedData[i].cardName,
            sortedData[i].isFoil === 1
              ? genericTranslations.pdfStructure.yes[langLocale]
              : genericTranslations.pdfStructure.no[langLocale],
            utilsServer.conditionDefinition[sortedData[i].condition],
            utilsServer.langDefinition[sortedData[i].lang][langLocale],
            sortedData[i].oldPrice
              ? sortedData[i].oldPrice.toFixed(2) + " €"
              : sortedData[i].oldPrice,
            sortedData[i].newPrice
              ? sortedData[i].newPrice.toFixed(2) + " €"
              : sortedData[i].newPrice,
            sortedData[i].regularCardsTrend
              ? sortedData[i].regularCardsTrend.toFixed(2) + " €"
              : sortedData[i].regularCardsTrend,
            sortedData[i].foilCardsTrend
              ? sortedData[i].foilCardsTrend.toFixed(2) + " €"
              : sortedData[i].foilCardsTrend,
            sortedData[i].idArticle,
          ],
          [
            {
              colSpan: 10,
              text:
                "Both:\nrowSpan and colSpan\ncan be defined at the same time",
            },
          ],
        ];
      } else {
        //Here we just print the normal line
        arrayWithAllData = [
          ...arrayWithAllData,
          [
            sortedData[i].cardName,
            sortedData[i].isFoil === 1
              ? genericTranslations.pdfStructure.yes[langLocale]
              : genericTranslations.pdfStructure.no[langLocale],
            utilsServer.conditionDefinition[sortedData[i].condition],
            utilsServer.langDefinition[sortedData[i].lang][langLocale],
            {
              text: sortedData[i].oldPrice
                ? sortedData[i].oldPrice.toFixed(2) + " €"
                : sortedData[i].oldPrice,
              style: "alignRight",
            },
            {
              text: sortedData[i].newPrice
                ? sortedData[i].newPrice.toFixed(2) + " €"
                : sortedData[i].newPrice,
              style: "alignRight",
            },
            {
              text: sortedData[i].regularCardsTrend
                ? sortedData[i].regularCardsTrend.toFixed(2) + " €"
                : sortedData[i].regularCardsTrend,
              style: "alignRight",
            },
            {
              text: sortedData[i].foilCardsTrend
                ? sortedData[i].foilCardsTrend.toFixed(2) + " €"
                : sortedData[i].foilCardsTrend,
              style: "alignRight",
            },
            { text: sortedData[i].idArticle, style: "alignRight" },
          ],
        ];
      }
    }

    return arrayWithAllData;
  }
  function generateLineBlockedPriceCard(data) {
    const sortedData = data.rows.sort(utilsServer.compareByCardName);

    let arrayWithAllData = [];

    for (let i = 0; i < data.rows.length; i++) {
      arrayWithAllData = [
        ...arrayWithAllData,
        [
          sortedData[i].cardName,
          sortedData[i].isFoil === 1
            ? genericTranslations.pdfStructure.yes[langLocale]
            : genericTranslations.pdfStructure.no[langLocale],
          utilsServer.conditionDefinition[sortedData[i].condition],
          utilsServer.langDefinition[sortedData[i].lang][langLocale],
          {
            text: sortedData[i].oldPrice
              ? sortedData[i].oldPrice.toFixed(2) + " €"
              : sortedData[i].oldPrice,
            style: "alignRight",
          },
          {
            text: sortedData[i].newPrice
              ? sortedData[i].newPrice.toFixed(2) + " €"
              : sortedData[i].newPrice,
            style: "alignRight",
          },
          {
            text: sortedData[i].regularCardsTrend
              ? sortedData[i].regularCardsTrend.toFixed(2) + " €"
              : sortedData[i].regularCardsTrend,
            style: "alignRight",
          },
          {
            text: sortedData[i].foilCardsTrend
              ? sortedData[i].foilCardsTrend.toFixed(2) + " €"
              : sortedData[i].foilCardsTrend,
            style: "alignRight",
          },
          { text: sortedData[i].idArticle, style: "alignRight" },
        ],

        [
          {
            colSpan: 9,
            text:
              priceshieldTranslations.priceShieldReasons[
                sortedData[i].priceShieldReason
              ][langLocale],
          },
          {},
          {},
          {},
          {},
          {},
          {},
          {},
          {},
        ],
      ];
    }

    return arrayWithAllData;
  }
  function generateLineExcludedCard(data, shouldPrintExplaination) {
    const sortedData = data.rows.sort(utilsServer.compareByCardName);

    let arrayWithAllData = [];

    for (let i = 0; i < data.rows.length; i++) {
      if (shouldPrintExplaination) {
        //Here we print all details

        arrayWithAllData = [
          ...arrayWithAllData,
          [
            sortedData[i].cardName,
            sortedData[i].isFoil === 1
              ? genericTranslations.pdfStructure.yes[langLocale]
              : genericTranslations.pdfStructure.no[langLocale],
            utilsServer.conditionDefinition[sortedData[i].condition],
            utilsServer.langDefinition[sortedData[i].lang][langLocale],
            sortedData[i].oldPrice
              ? sortedData[i].oldPrice.toFixed(2) + " €"
              : sortedData[i].oldPrice,
            sortedData[i].newPrice
              ? sortedData[i].newPrice.toFixed(2) + " €"
              : sortedData[i].newPrice,
            sortedData[i].regularCardsTrend
              ? sortedData[i].regularCardsTrend.toFixed(2) + " €"
              : sortedData[i].regularCardsTrend,
            sortedData[i].foilCardsTrend
              ? sortedData[i].foilCardsTrend.toFixed(2) + " €"
              : sortedData[i].foilCardsTrend,
            sortedData[i].idArticle,
          ],
          [
            {
              colSpan: 10,
              text:
                "Both:\nrowSpan and colSpan\ncan be defined at the same time",
            },
          ],
        ];
      } else {
        //Here we just print the normal line
        arrayWithAllData = [
          ...arrayWithAllData,
          [
            sortedData[i].cardName,
            sortedData[i].isFoil === 1
              ? genericTranslations.pdfStructure.yes[langLocale]
              : genericTranslations.pdfStructure.no[langLocale],
            utilsServer.conditionDefinition[sortedData[i].condition],
            utilsServer.langDefinition[sortedData[i].lang][langLocale],
            {
              text: sortedData[i].oldPrice
                ? sortedData[i].oldPrice.toFixed(2) + " €"
                : sortedData[i].oldPrice,
              style: "alignRight",
            },
            {
              text: sortedData[i].newPrice
                ? sortedData[i].newPrice.toFixed(2) + " €"
                : sortedData[i].newPrice,
              style: "alignRight",
            },
            {
              text: sortedData[i].regularCardsTrend
                ? sortedData[i].regularCardsTrend.toFixed(2) + " €"
                : sortedData[i].regularCardsTrend,
              style: "alignRight",
            },
            {
              text: sortedData[i].foilCardsTrend
                ? sortedData[i].foilCardsTrend.toFixed(2) + " €"
                : sortedData[i].foilCardsTrend,
              style: "alignRight",
            },
            { text: sortedData[i].idArticle, style: "alignRight" },
          ],
        ];
      }
    }

    return arrayWithAllData;
  }

  /* *************************** */
  /* ******* TEMPLATE ********** */
  /* *************************** */

  function displayFormatsUsed(formatsUsed) {
    if (formatsUsed.length > 0) {
      return formatsUsed.map((formatFromSequelize, index) => {
        if (index !== 0) {
          return (
            " " +
            utils.capitalizeFirstLetter(formatFromSequelize.dataValues.name)
          );
        } else {
          return utils.capitalizeFirstLetter(
            formatFromSequelize.dataValues.name
          );
        }
      });
    } else {
      return genericTranslations.pdfStructure.targetedFormatsNone[langLocale];
    }
  }

  function displayExpansionsUsed(listOfExpansions) {
    if (listOfExpansions.length > 0) {
      return (
        genericTranslations.pdfStructure.targetedExpansions[langLocale] +
        listOfExpansions.reduce((accumulator, expansion, index) => {
          if (index !== 0) {
            return accumulator + ", " + expansion.dataValues.name;
          } else {
            return accumulator + expansion.dataValues.name;
          }
        }, "")
      );
    } else {
      return genericTranslations.pdfStructure.targetedExpansionsNone[
        langLocale
      ];
    }
  }

  function displayRegularRules(orderedSnapshotCustomRulesRegular) {
    if (orderedSnapshotCustomRulesRegular.length > 0) {
      return {
        table: {
          headerRows: 1,
          widths: [50, 50, 50, 50, 120, 120],
          body: [
            [
              {
                text: genericTranslations.pdfStructure.from[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text: genericTranslations.pdfStructure.to[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text: genericTranslations.pdfStructure.action[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text: genericTranslations.pdfStructure.valueSet[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text: genericTranslations.pdfStructure.mkmAction[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text: genericTranslations.pdfStructure.basedOn[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
            ],
            ...orderedSnapshotCustomRulesRegular.map((rule) => {
              return [
                {
                  text:
                    rule.priceRangeFrom.countDecimals() < 2
                      ? rule.priceRangeFrom.toFixed(2) + " €"
                      : rule.priceRangeFrom,
                  style: "alignRight",
                },
                {
                  text:
                    rule.priceRangeTo.countDecimals() < 2
                      ? rule.priceRangeTo.toFixed(2) + " €"
                      : rule.priceRangeTo,
                  style: "alignRight",
                },
                {
                  text:
                    genericTranslations.ruleTypesDictionnary[langLocale][
                      ruleTypesDefinitionsDictionnary[rule.ruleTypeId].name
                    ],
                  style: "actionTitle",
                },
                rule.ruleTypeId === 1
                  ? {
                      text:
                        rule.priceRangeValueToSet.countDecimals() < 2
                          ? rule.priceRangeValueToSet.toFixed(2) + " €"
                          : rule.priceRangeValueToSet,
                      style: "alignRight",
                    }
                  : "",
                rule.ruleTypeId === 2
                  ? genericTranslations.BehaviourDictionnary[langLocale][
                      customRulesBehaviourDictionnary[rule.behaviourId].name
                    ]
                  : "",
                rule.ruleTypeId === 2
                  ? {
                      text:
                        hasPricedBasedOn === "mkmTrends"
                          ? genericTranslations.algoDictionnary[langLocale][
                              mkmPricesGuideDictionnary[
                                rule.mkmPriceGuideReference
                              ].name
                            ]
                          : genericTranslations.pdfStructure.oldPrice[
                              langLocale
                            ],
                      fontSize: 11,
                    }
                  : "",
              ];
            }),
          ],
        },
        style: "customRulesTable",
      };
    } else {
      return {
        text: genericTranslations.pdfStructure.noRegularRules[langLocale],
        alignment: "center",
      };
    }
  }

  function displayFoilRules(orderedSnapshotCustomRulesFoil) {
    if (orderedSnapshotCustomRulesFoil.length > 0) {
      return {
        table: {
          headerRows: 1,
          widths: [50, 50, 50, 50, 120, 120],
          body: [
            [
              {
                text: genericTranslations.pdfStructure.from[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text: genericTranslations.pdfStructure.to[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text: genericTranslations.pdfStructure.action[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text: genericTranslations.pdfStructure.valueSet[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text: genericTranslations.pdfStructure.mkmAction[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text: genericTranslations.pdfStructure.basedOn[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
            ],
            ...orderedSnapshotCustomRulesFoil.map((rule) => {
              return [
                {
                  text:
                    rule.priceRangeFrom.countDecimals() < 2
                      ? rule.priceRangeFrom.toFixed(2) + " €"
                      : rule.priceRangeFrom,
                  style: "alignRight",
                },
                {
                  text:
                    rule.priceRangeTo.countDecimals() < 2
                      ? rule.priceRangeTo.toFixed(2) + " €"
                      : rule.priceRangeTo,
                  style: "alignRight",
                },
                {
                  text:
                    genericTranslations.ruleTypesDictionnary[langLocale][
                      ruleTypesDefinitionsDictionnary[rule.ruleTypeId].name
                    ],
                  style: "actionTitle",
                },
                rule.ruleTypeId === 1
                  ? {
                      text:
                        rule.priceRangeValueToSet.countDecimals() < 2
                          ? rule.priceRangeValueToSet.toFixed(2) + " €"
                          : rule.priceRangeValueToSet,
                      style: "alignRight",
                    }
                  : "",
                rule.ruleTypeId === 2
                  ? genericTranslations.BehaviourDictionnary[langLocale][
                      customRulesBehaviourDictionnary[rule.behaviourId].name
                    ]
                  : "",
                rule.ruleTypeId === 2
                  ? {
                      text:
                        hasPricedBasedOn === "mkmTrends"
                          ? genericTranslations.algoDictionnary[langLocale][
                              mkmPricesGuideDictionnary[
                                rule.mkmPriceGuideReference
                              ].name
                            ]
                          : genericTranslations.pdfStructure.oldPrice[
                              langLocale
                            ],
                      fontSize: 11,
                    }
                  : "",
              ];
            }),
          ],
        },
        style: "customRulesTable",
        pageBreak: "after",
      };
    } else {
      return {
        text: genericTranslations.pdfStructure.noFoilRules[langLocale],
        alignment: "center",
      };
    }
  }

  var printer = new PdfPrinter(fonts);
  var docDefinition = {
    pageMargins: [40, 60, 40, 80],
    content: [
      {
        image: path.join(__dirname, "..", "assets", "pdf_header.png"),
        width: 600,
        height: 120,
      },
      {
        text: genericTranslations.pdfStructure.pdfTitle[langLocale] + idScript,
        style: "mainTitle",
      },
      {
        text: isTestScript
          ? genericTranslations.pdfStructure.testProcedure[
              langLocale
            ].toUpperCase()
          : " ",
        style: "subTitle",
      },
      { text: " " },
      {
        table: {
          headerRows: 1,
          widths: [200, 200],
          body: [
            [
              {
                text: genericTranslations.pdfStructure.reference[
                  langLocale
                ].toUpperCase(),
                style: "titleMainInfoPutRequest",
              },
              { text: put_requestId, style: "mainInfoPutRequest" },
            ],
            [
              {
                text: genericTranslations.pdfStructure.date[
                  langLocale
                ].toUpperCase(),
                style: "titleMainInfoPutRequest",
              },
              {
                text: moment().format(translation.FormatDate[langLocale]),
                style: "mainInfoPutRequest",
              },
            ],
          ],
        },
        layout: "noBorders",
        style: "MainInfoTable",
      },
      {
        table: {
          headerRows: 1,
          widths: [200, 200],
          body: [
            [
              {
                text: genericTranslations.pdfStructure.hasPriceBasedOn[
                  langLocale
                ].toUpperCase(),
                style: "titleMainInfoPutRequest",
              },
              hasPricedBasedOn === "mkmTrends"
                ? {
                    text:
                      genericTranslations.pdfStructure.MKMTrends[langLocale],
                    style: "mainInfoPutRequest",
                  }
                : {
                    text:
                      genericTranslations.pdfStructure.oldPrices[langLocale],
                    style: "mainInfoPutRequest",
                  },
            ],
            [
              {
                text: genericTranslations.pdfStructure.usedFormats[
                  langLocale
                ].toUpperCase(),
                style: "titleMainInfoPutRequest",
              },
              { text: displayFormatsUsed(usedFormats) },
            ],
            [
              {
                text: genericTranslations.pdfStructure.keywordBehaviourTitle[
                  langLocale
                ].toUpperCase(),
                style: "titleMainInfoPutRequest",
              },
              genericTranslations.pdfStructure.keywordBehaviour[
                putRequestKeywordBehaviour
              ][langLocale],
            ],
            [
              {
                text: genericTranslations.pdfStructure.keywordTitle[
                  langLocale
                ].toUpperCase(),
                style: "titleMainInfoPutRequest",
              },
              {
                text: snapshotKeywords.reduce((accumulator, keyword, index) => {
                  if (index !== 0) {
                    return (
                      accumulator + ", " + '"' + keyword.dataValues.name + '"'
                    );
                  } else {
                    return accumulator + '"' + keyword.dataValues.name + '"';
                  }
                }, ""),
              },
            ],
            [
              {
                text: genericTranslations.pdfStructure.rarityUsed[
                  langLocale
                ].toUpperCase(),
                style: "titleMainInfoPutRequest",
              },
              {
                text: snapshotRarities.reduce((accumulator, rarity, index) => {
                  if (index !== 0) {
                    return (
                      accumulator +
                      ", " +
                      genericTranslations.pdfStructure[rarity.dataValues.name][
                        langLocale
                      ]
                    );
                  } else {
                    return genericTranslations.pdfStructure[
                      rarity.dataValues.name
                    ][langLocale];
                  }
                }, ""),
              },
            ],
            [
              {
                text: genericTranslations.pdfStructure.targetedExpansions[
                  langLocale
                ].toUpperCase(),
                style: "titleMainInfoPutRequest",
              },
              { text: displayExpansionsUsed(snapshotExpansions) },
            ],
          ],
        },
        layout: "noBorders",
        style: "MainInfoTable",
      },
      { text: " " },
      {
        text: genericTranslations.pdfStructure.summary[langLocale],
        alignment: "center",
      },
      { text: " " },
      {
        table: {
          headerRows: 1,
          widths: [300, "auto", 10],
          body: [
            [
              genericTranslations.pdfStructure.cardsSetAtHigherPrice[
                langLocale
              ],
              all_higher_price_put_memories.count,
              {
                svg:
                  '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="#626262" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></g></svg>',
                width: 20,
                height: 17,
              },
            ],
            [
              genericTranslations.pdfStructure.cardsSetAtLowerPrice[langLocale],
              all_lower_price_put_memories.count,
              {
                svg:
                  '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="#626262" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7l10 10"/><path d="M17 7v10H7"/></g></svg>',
                width: 20,
                height: 17,
              },
            ],
            [
              genericTranslations.pdfStructure.cardsBlockedByPriceShield[
                langLocale
              ],
              all_priceShield_blocked_put_memories.count,
              {
                svg:
                  '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="#626262" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3l-8 3v7c0 6 8 10 8 10z"/></g></svg>',
                width: 20,
                height: 17,
              },
            ],
            [
              genericTranslations.pdfStructure.cardsExcluded[langLocale],
              all_excluded_put_memories.count,
              {
                svg:
                  '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="#626262" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></g></svg>',
                width: 20,
                height: 17,
              },
            ],
          ],
        },
        layout: "noBorders",
        style: "recapTable",
        pageBreak: "after",
      },
      ////////////////////////////
      // SUMMARY OF RULES
      ////////////////////////////
      {
        text: genericTranslations.pdfStructure.summaryOfUsedRules[
          langLocale
        ].toUpperCase(),
        style: "pageTitle",
      },
      {
        text: genericTranslations.pdfStructure.regularCards[langLocale],
        style: "tableTitle",
      },
      displayRegularRules(orderedSnapshotCustomRules.regular),
      {
        text: genericTranslations.pdfStructure.foilCards[langLocale],
        style: "tableTitle",
      },
      displayFoilRules(orderedSnapshotCustomRules.foil),
      {
        text: genericTranslations.pdfStructure.parameters[langLocale],
        style: "pageTitle",
      },
      {
        text:
          genericTranslations.pdfStructure.percentPerConditionRegular[
            langLocale
          ],
        style: "tableTitle",
      },
      {
        table: {
          headerRows: 1,
          widths: [300, "auto"],
          body: [
            [
              "Mint",
              {
                text:
                  snapshotShopParams.dataValues.percentPerMintRegular + " %",
                alignment: "right",
              },
            ],
            [
              "Near Mint",
              {
                text:
                  snapshotShopParams.dataValues.percentPerNearMintRegular +
                  " %",
                alignment: "right",
              },
            ],
            [
              "Excellent",
              {
                text:
                  snapshotShopParams.dataValues.percentPerExcellentRegular +
                  " %",
                alignment: "right",
              },
            ],
            [
              "Good",
              {
                text:
                  snapshotShopParams.dataValues.percentPerGoodRegular + " %",
                alignment: "right",
              },
            ],
            [
              "Light-Played",
              {
                text:
                  snapshotShopParams.dataValues.percentPerLightPlayedRegular +
                  " %",
                alignment: "right",
              },
            ],
            [
              "Played",
              {
                text:
                  snapshotShopParams.dataValues.percentPerPlayedRegular + " %",
                alignment: "right",
              },
            ],
            [
              "Poor",
              {
                text:
                  snapshotShopParams.dataValues.percentPerPoorRegular + " %",
                alignment: "right",
              },
            ],
          ],
        },
        style: "recapTable",
      },
      {
        text:
          genericTranslations.pdfStructure.percentPerConditionFoil[langLocale],
        style: "tableTitle",
      },
      {
        table: {
          headerRows: 1,
          widths: [300, "auto"],
          body: [
            [
              "Mint",
              {
                text: snapshotShopParams.dataValues.percentPerMintFoil + " %",
                alignment: "right",
              },
            ],
            [
              "Near Mint",
              {
                text:
                  snapshotShopParams.dataValues.percentPerNearMintFoil + " %",
                alignment: "right",
              },
            ],
            [
              "Excellent",
              {
                text:
                  snapshotShopParams.dataValues.percentPerExcellentFoil + " %",
                alignment: "right",
              },
            ],
            [
              "Good",
              {
                text: snapshotShopParams.dataValues.percentPerGoodFoil + " %",
                alignment: "right",
              },
            ],
            [
              "Light-Played",
              {
                text:
                  snapshotShopParams.dataValues.percentPerLightPlayedFoil +
                  " %",
                alignment: "right",
              },
            ],
            [
              "Played",
              {
                text: snapshotShopParams.dataValues.percentPerPlayedFoil + " %",
                alignment: "right",
              },
            ],
            [
              "Poor",
              {
                text: snapshotShopParams.dataValues.percentPerPoorFoil + " %",
                alignment: "right",
              },
            ],
          ],
        },
        style: "recapTable",
      },
      {
        text: genericTranslations.pdfStructure.percentPerLanguage[langLocale],
        style: "tableTitle",
      },
      {
        table: {
          headerRows: 1,
          widths: [300, "auto"],
          body: [
            [
              genericTranslations.pdfStructure.german[langLocale],
              {
                text: snapshotShopParams.dataValues.percentPerLangGerman + " %",
                alignment: "right",
              },
            ],
            [
              genericTranslations.pdfStructure.spanish[langLocale],
              {
                text:
                  snapshotShopParams.dataValues.percentPerLangSpanish + " %",
                alignment: "right",
              },
            ],
            [
              genericTranslations.pdfStructure.french[langLocale],
              {
                text: snapshotShopParams.dataValues.percentPerLangFrench + " %",
                alignment: "right",
              },
            ],
            [
              genericTranslations.pdfStructure.italian[langLocale],
              {
                text:
                  snapshotShopParams.dataValues.percentPerLangItalian + " %",
                alignment: "right",
              },
            ],
            [
              genericTranslations.pdfStructure.japanese[langLocale],
              {
                text:
                  snapshotShopParams.dataValues.percentPerLangJapanese + " %",
                alignment: "right",
              },
            ],
            [
              genericTranslations.pdfStructure.portuguese[langLocale],
              {
                text:
                  snapshotShopParams.dataValues.percentPerLangPortuguese + " %",
                alignment: "right",
              },
            ],
            [
              genericTranslations.pdfStructure.russian[langLocale],
              {
                text:
                  snapshotShopParams.dataValues.percentPerLangRussian + " %",
                alignment: "right",
              },
            ],
            [
              genericTranslations.pdfStructure.simplifiedChinese[langLocale],
              {
                text:
                  snapshotShopParams.dataValues
                    .percentPerLangSimplifiedChinese + " %",
                alignment: "right",
              },
            ],
            [
              genericTranslations.pdfStructure.english[langLocale],
              {
                text:
                  snapshotShopParams.dataValues.percentPerLangEnglish + " %",
                alignment: "right",
              },
            ],
            [
              genericTranslations.pdfStructure.korean[langLocale],
              {
                text: snapshotShopParams.dataValues.percentPerLangKorean + " %",
                alignment: "right",
              },
            ],
            [
              genericTranslations.pdfStructure.traditionalChinese[langLocale],
              {
                text:
                  snapshotShopParams.dataValues
                    .percentPerLangTraditionalChinese + " %",
                alignment: "right",
              },
            ],
          ],
        },
        style: "recapTable",
        pageBreak: "after",
      },
      ////////////////////////////
      // CARDS SET AT HIGHER PRICE
      ////////////////////////////
      {
        text:
          genericTranslations.pdfStructure.cardsSetAtHigherPrice[
            langLocale
          ].toUpperCase() +
          " (" +
          all_higher_price_put_memories.count +
          ")",
        style: "pageTitle",
      },
      {
        svg:
          '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="#626262" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></g></svg>',
        width: 40,
        height: 34,
        absolutePosition: { x: 510, y: 55 },
      },
      {
        table: {
          headerRows: 1,
          widths: [80, "auto", "auto", 90, 40, 40, 45, 45, "auto"],
          body: [
            [
              {
                text: genericTranslations.pdfStructure.cardName[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text: genericTranslations.pdfStructure.foil[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text: genericTranslations.pdfStructure.condition[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text: genericTranslations.pdfStructure.language[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text: genericTranslations.pdfStructure.oldPrice[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text: genericTranslations.pdfStructure.newPrice[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text: genericTranslations.pdfStructure.priceTrend[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text:
                  genericTranslations.pdfStructure.foilPriceTrend[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              { text: "idArticle", fillColor: "#1c64f2", alignment: "center" },
            ],
            ...generateLineHigherPriceCard(
              all_higher_price_put_memories,
              printExplaination
            ),
          ],
        },
        style: "bigTableHigherPrice",
        pageBreak: "after",
      },
      {
        text:
          genericTranslations.pdfStructure.cardsSetAtLowerPrice[
            langLocale
          ].toUpperCase() +
          " (" +
          all_lower_price_put_memories.count +
          ")",
        style: "pageTitle",
      },
      {
        svg:
          '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="#626262" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7l10 10"/><path d="M17 7v10H7"/></g></svg>',
        width: 40,
        height: 34,
        absolutePosition: { x: 510, y: 55 },
      },
      {
        table: {
          headerRows: 1,
          widths: [80, "auto", "auto", 90, 40, 40, 45, 45, "auto"],
          body: [
            [
              {
                text: genericTranslations.pdfStructure.cardName[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text: genericTranslations.pdfStructure.foil[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text: genericTranslations.pdfStructure.condition[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text: genericTranslations.pdfStructure.language[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text: genericTranslations.pdfStructure.oldPrice[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text: genericTranslations.pdfStructure.newPrice[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text: genericTranslations.pdfStructure.priceTrend[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text:
                  genericTranslations.pdfStructure.foilPriceTrend[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              { text: "idArticle", fillColor: "#1c64f2", alignment: "center" },
            ],
            ...generateLineLowerPriceCard(
              all_lower_price_put_memories,
              printExplaination
            ),
          ],
        },
        style: "bigTableLowerPrice",
        pageBreak: "after",
      },
      {
        text:
          genericTranslations.pdfStructure.cardsBlockedByPriceShield[
            langLocale
          ].toUpperCase() +
          " (" +
          all_priceShield_blocked_put_memories.count +
          ")",
        style: "pageTitle",
      },
      {
        svg:
          '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="#626262" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3l-8 3v7c0 6 8 10 8 10z"/></g></svg>',
        width: 40,
        height: 34,
        absolutePosition: { x: 510, y: 55 },
      },
      {
        table: {
          headerRows: 1,
          widths: [80, "auto", "auto", 90, 40, 40, 45, 45, "auto"],
          body: [
            [
              {
                text: genericTranslations.pdfStructure.cardName[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text: genericTranslations.pdfStructure.foil[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text: genericTranslations.pdfStructure.condition[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text: genericTranslations.pdfStructure.language[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text: genericTranslations.pdfStructure.oldPrice[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text: genericTranslations.pdfStructure.newPrice[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text: genericTranslations.pdfStructure.priceTrend[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text:
                  genericTranslations.pdfStructure.foilPriceTrend[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              { text: "idArticle", fillColor: "#1c64f2", alignment: "center" },
            ],
            ...generateLineBlockedPriceCard(
              all_priceShield_blocked_put_memories,
              printExplaination
            ),
          ],
        },
        style: "bigTablePricehieldBlockedCards",
        pageBreak: "after",
      },
      // ********************** //
      // *** EXCLUDED CARDS *** //
      // ********************** //
      {
        text:
          genericTranslations.pdfStructure.cardsExcluded[
            langLocale
          ].toUpperCase() +
          " (" +
          all_excluded_put_memories.count +
          ")",
        style: "pageTitle",
      },
      {
        svg:
          '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><g fill="none" stroke="#626262" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></g></svg>',
        width: 40,
        height: 34,
        absolutePosition: { x: 510, y: 55 },
      },
      {
        table: {
          headerRows: 1,
          widths: [80, "auto", "auto", 90, 40, 40, 45, 45, "auto"],
          body: [
            [
              {
                text: genericTranslations.pdfStructure.cardName[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text: genericTranslations.pdfStructure.foil[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text: genericTranslations.pdfStructure.condition[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text: genericTranslations.pdfStructure.language[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text: genericTranslations.pdfStructure.oldPrice[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text: genericTranslations.pdfStructure.newPrice[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text: genericTranslations.pdfStructure.priceTrend[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              {
                text:
                  genericTranslations.pdfStructure.foilPriceTrend[langLocale],
                fillColor: "#1c64f2",
                alignment: "center",
              },
              { text: "idArticle", fillColor: "#1c64f2", alignment: "center" },
            ],
            ...generateLineExcludedCard(
              all_excluded_put_memories,
              printExplaination
            ),
          ],
        },
        style: "bigTableExcludedCards",
      },
    ],
    footer: generateFooter,
    styles: {
      mainTitle: {
        alignment: "center",
        fontSize: 30,
      },
      subTitle: {
        alignment: "center",
        margin: [0, 20, 0, 20],
      },
      sentenceRecapWithNumber: {
        alignment: "right",
        margin: [0, 0, 150, 0],
      },
      recapTable: {
        margin: [100, 0, 50, 0],
      },
      actionTitle: {
        fontSize: 11,
      },
      alignRight: {
        alignment: "right",
      },
      MainInfoTable: { margin: [100, 10, 0, 10] },
      customRulesTable: {
        margin: [20, 0, 50, 0],
      },
      pageTitle: {
        alignment: "center",
        fontSize: 18,
      },
      tableTitle: {
        alignment: "center",
        fontSize: 15,
        margin: [0, 15, 0, 15],
      },
      bigTableHigherPrice: {
        margin: [15, 20, 0, 0],
        fontSize: 10,
      },
      bigTableLowerPrice: { margin: [15, 20, 0, 0], fontSize: 10 },
      bigTablePricehieldBlockedCards: { margin: [15, 20, 0, 0], fontSize: 10 },
      bigTableExcludedCards: { margin: [15, 20, 0, 0], fontSize: 10 },
      footer: {
        alignment: "center",
        margin: [0, 0, 0, 10],
      },
      footerMention: {
        alignment: "center",
        fontSize: 10,
      },
      titleMainInfoPutRequest: {
        bold: true,
      },
      mainInfoPutRequest: {},
    },
  };
  var options;

  var pdfDoc = printer.createPdfKitDocument(docDefinition, options);

  const pathPdfStorageFolder = path.join(__dirname, "..", "..", "PDF_storage");

  if (!fs.existsSync(pathPdfStorageFolder)) {
    fs.mkdirSync(pathPdfStorageFolder);
  }

  //Creating folder if it doesnt exist
  // sync, should be async, fine for now
  const folderPathWithUserId = path.join(
    __dirname,
    "..",
    "..",
    "PDF_storage",
    `${put_request.dataValues.idShop}`
  );
  if (!fs.existsSync(folderPathWithUserId)) {
    fs.mkdirSync(folderPathWithUserId);
  }

  /* ************************ */
  /* *****PATH DEFINITION**** */
  /* ************************ */

  // Is it a Test Script or a real one ?

  let pdfPathName;
  if (isTestScript) {
    pdfPathName = path.join(
      folderPathWithUserId,
      "/" + createSummaryPDFName(idScript, put_request.dataValues.idShop, true)
    );
  } else {
    pdfPathName = path.join(
      folderPathWithUserId,
      "/" + createSummaryPDFName(idScript, put_request.dataValues.idShop, false)
    );
  }
  // pdf writing
  pdfDoc.pipe(fs.createWriteStream(pdfPathName));
  pdfDoc.end();

  console.log("processing PDF...");
}

function createSummaryPDFName(idScript, idShop, isTest) {
  let pdfName;
  if (isTest) {
    pdfName =
      "shop_" + idShop + "_" + "script_" + idScript + "_" + "Test" + ".pdf";
  } else {
    pdfName =
      "shop_" + idShop + "_" + "script_" + idScript + "_" + "Real" + ".pdf";
  }

  return pdfName;
}

module.exports = {
  generatePDFFromPutRequest,
  createSummaryPDFName,
};
