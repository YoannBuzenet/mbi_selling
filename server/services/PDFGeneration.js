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

async function generatePDFFromPutRequest(
  put_requestId,
  // langLocale = "fr-FR",
  langLocale = "en-US",
  isTestScript = true,
  printExplaination = false
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

  if (all_put_memories.rows.length === 0) {
    throw new Error(
      "This script has no put memory created. Can't generate a PDF from that."
    );
  }

  const idScript = all_put_memories.rows[0].dataValues.idScript;

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
    },
  });

  const all_lower_price_put_memories = await db.put_memory.findAndCountAll({
    where: {
      PUT_Request_id: put_requestId,
      newPrice: {
        [Op.lt]: Sequelize.col("oldPrice"),
      },
      priceShieldBlocked: 0,
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
      [Op.or]: {
        behaviourChosen: "Excluded",
        behaviourChosen: "Signed/Altered/Playset skipped",
      },
      // behaviourChosen: "Excluded",
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

  //yooy
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
            utilsServer.langDefinition[sortedData[i].lang],
            sortedData[i].oldPrice,
            sortedData[i].newPrice,
            sortedData[i].regularCardsTrend,
            sortedData[i].foilCardsTrend,
            sortedData[i].idProduct,
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
            utilsServer.langDefinition[sortedData[i].lang],
            sortedData[i].oldPrice,
            sortedData[i].newPrice,
            sortedData[i].regularCardsTrend,
            sortedData[i].foilCardsTrend,
            sortedData[i].idProduct,
            sortedData[i].idArticle,
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
            utilsServer.langDefinition[sortedData[i].lang],
            sortedData[i].oldPrice,
            sortedData[i].newPrice,
            sortedData[i].regularCardsTrend,
            sortedData[i].foilCardsTrend,
            sortedData[i].idProduct,
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
            utilsServer.langDefinition[sortedData[i].lang],
            sortedData[i].oldPrice,
            sortedData[i].newPrice,
            sortedData[i].regularCardsTrend,
            sortedData[i].foilCardsTrend,
            sortedData[i].idProduct,
            sortedData[i].idArticle,
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
          utilsServer.langDefinition[sortedData[i].lang],
          sortedData[i].oldPrice,
          sortedData[i].newPrice,
          sortedData[i].regularCardsTrend,
          sortedData[i].foilCardsTrend,
          sortedData[i].idProduct,
          sortedData[i].idArticle,
        ],

        [
          {
            colSpan: 10,
            text:
              priceshieldTranslations.priceShieldReasons[
                sortedData[i].priceShieldReason
              ][langLocale],
          },
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
            utilsServer.langDefinition[sortedData[i].lang],
            sortedData[i].oldPrice,
            sortedData[i].newPrice,
            sortedData[i].regularCardsTrend,
            sortedData[i].foilCardsTrend,
            sortedData[i].idProduct,
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
            utilsServer.langDefinition[sortedData[i].lang],
            sortedData[i].oldPrice,
            sortedData[i].newPrice,
            sortedData[i].regularCardsTrend,
            sortedData[i].foilCardsTrend,
            sortedData[i].idProduct,
            sortedData[i].idArticle,
          ],
        ];
      }
    }

    return arrayWithAllData;
  }

  var printer = new PdfPrinter(fonts);
  var docDefinition = {
    pageMargins: [40, 60, 40, 80],
    content: [
      { text: " " },
      { text: " " },
      { text: " " },
      { text: " " },
      { text: " " },
      {
        text: genericTranslations.pdfStructure.pdfTitle[langLocale] + idScript,
        style: "mainTitle",
      },
      { text: " " },
      {
        text: isTestScript
          ? genericTranslations.pdfStructure.testProcedure[langLocale]
          : " ",
        style: "subTitle",
      },
      { text: " " },
      { text: " " },
      { text: moment().format(translation.FormatDate[langLocale]) },
      {
        text:
          genericTranslations.pdfStructure.reference[langLocale] +
          put_requestId,
      },
      { text: " " },
      {
        text:
          genericTranslations.pdfStructure.usedFormats[langLocale] +
          usedFormats.map((formatFromSequelize, index) => {
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
          }),
      },
      { text: " " },
      {
        table: {
          headerRows: 1,
          widths: [300, "auto"],
          body: [
            [
              genericTranslations.pdfStructure.cardsConcernedByScript[
                langLocale
              ],
              all_put_memories.count,
            ],
          ],
        },
        layout: "noBorders",
        style: "recapTable",
      },
      {
        text: genericTranslations.pdfStructure.summary[langLocale],
      },
      { text: " " },
      {
        table: {
          headerRows: 1,
          widths: [300, "auto"],
          body: [
            [
              genericTranslations.pdfStructure.cardsSetAtHigherPrice[
                langLocale
              ],
              all_higher_price_put_memories.count,
            ],
            [
              genericTranslations.pdfStructure.cardsSetAtLowerPrice[langLocale],
              all_lower_price_put_memories.count,
            ],
            [
              genericTranslations.pdfStructure.cardsBlockedByPriceShield[
                langLocale
              ],
              all_priceShield_blocked_put_memories.count,
            ],
            [
              genericTranslations.pdfStructure.cardsExcluded[langLocale],
              all_excluded_put_memories.count,
            ],
          ],
        },
        layout: "noBorders",
        style: "recapTable",
        pageBreak: "after",
      },
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
      {
        table: {
          headerRows: 1,
          widths: [50, 50, 50, 50, 120, 120],
          body: [
            [
              genericTranslations.pdfStructure.from[langLocale],
              genericTranslations.pdfStructure.to[langLocale],
              genericTranslations.pdfStructure.action[langLocale],
              genericTranslations.pdfStructure.valueSet[langLocale],
              genericTranslations.pdfStructure.mkmAction[langLocale],
              genericTranslations.pdfStructure.basedOn[langLocale],
            ],
            ...orderedSnapshotCustomRules.regular.map((rule) => {
              return [
                rule.priceRangeFrom,
                rule.priceRangeTo,
                genericTranslations.ruleTypesDictionnary[langLocale][
                  ruleTypesDefinitionsDictionnary[rule.ruleTypeId].name
                ],
                rule.ruleTypeId === 1 ? rule.priceRangeValueToSet : "",
                rule.ruleTypeId === 2
                  ? genericTranslations.BehaviourDictionnary[langLocale][
                      customRulesBehaviourDictionnary[rule.behaviourId].name
                    ]
                  : "",
                rule.ruleTypeId === 2
                  ? mkmPricesGuideDictionnary[rule.mkmPriceGuideReference].name
                  : "",
              ];
            }),
          ],
        },
        style: "customRulesTable",
      },
      {
        text: genericTranslations.pdfStructure.foilCards[langLocale],
        style: "tableTitle",
      },
      {
        table: {
          headerRows: 1,
          widths: [50, 50, 50, 50, 120, 120],
          body: [
            [
              genericTranslations.pdfStructure.from[langLocale],
              genericTranslations.pdfStructure.to[langLocale],
              genericTranslations.pdfStructure.action[langLocale],
              genericTranslations.pdfStructure.valueSet[langLocale],
              genericTranslations.pdfStructure.mkmAction[langLocale],
              genericTranslations.pdfStructure.basedOn[langLocale],
            ],
            ...orderedSnapshotCustomRules.foil.map((rule) => {
              return [
                rule.priceRangeFrom,
                rule.priceRangeTo,
                genericTranslations.ruleTypesDictionnary[langLocale][
                  ruleTypesDefinitionsDictionnary[rule.ruleTypeId].name
                ],
                rule.ruleTypeId === 1 ? rule.priceRangeValueToSet : "",
                rule.ruleTypeId === 2
                  ? customRulesBehaviourDictionnary[rule.behaviourId].name
                  : "",
                rule.ruleTypeId === 2
                  ? mkmPricesGuideDictionnary[rule.mkmPriceGuideReference].name
                  : "",
              ];
            }),
          ],
        },
        style: "customRulesTable",
        pageBreak: "after",
      },
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
              snapshotShopParams.dataValues.percentPerMintRegular + " %",
            ],
            [
              "Near Mint",
              snapshotShopParams.dataValues.percentPerNearMintRegular + " %",
            ],
            [
              "Excellent",
              snapshotShopParams.dataValues.percentPerExcellentRegular + " %",
            ],
            [
              "Good",
              snapshotShopParams.dataValues.percentPerGoodRegular + " %",
            ],
            [
              "Light-Played",
              snapshotShopParams.dataValues.percentPerLightPlayedRegular + " %",
            ],
            [
              "Played",
              snapshotShopParams.dataValues.percentPerPlayedRegular + " %",
            ],
            [
              "Poor",
              snapshotShopParams.dataValues.percentPerPoorRegular + " %",
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
            ["Mint", snapshotShopParams.dataValues.percentPerMintFoil + " %"],
            [
              "Near Mint",
              snapshotShopParams.dataValues.percentPerNearMintFoil + " %",
            ],
            [
              "Excellent",
              snapshotShopParams.dataValues.percentPerExcellentFoil + " %",
            ],
            ["Good", snapshotShopParams.dataValues.percentPerGoodFoil + " %"],
            [
              "Light-Played",
              snapshotShopParams.dataValues.percentPerLightPlayedFoil + " %",
            ],
            [
              "Played",
              snapshotShopParams.dataValues.percentPerPlayedFoil + " %",
            ],
            ["Poor", snapshotShopParams.dataValues.percentPerPoorFoil + " %"],
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
              snapshotShopParams.dataValues.percentPerLangGerman + " %",
            ],
            [
              genericTranslations.pdfStructure.spanish[langLocale],
              snapshotShopParams.dataValues.percentPerLangSpanish + " %",
            ],
            [
              genericTranslations.pdfStructure.french[langLocale],
              snapshotShopParams.dataValues.percentPerLangFrench + " %",
            ],
            [
              genericTranslations.pdfStructure.italian[langLocale],
              snapshotShopParams.dataValues.percentPerLangItalian + " %",
            ],
            [
              genericTranslations.pdfStructure.japanese[langLocale],
              snapshotShopParams.dataValues.percentPerLangJapanese + " %",
            ],
            [
              genericTranslations.pdfStructure.portuguese[langLocale],
              snapshotShopParams.dataValues.percentPerLangPortuguese + " %",
            ],
            [
              genericTranslations.pdfStructure.russian[langLocale],
              snapshotShopParams.dataValues.percentPerLangRussian + " %",
            ],
            [
              genericTranslations.pdfStructure.simplifiedChinese[langLocale],
              snapshotShopParams.dataValues.percentPerLangSimplifiedChinese +
                " %",
            ],
            [
              genericTranslations.pdfStructure.english[langLocale],
              snapshotShopParams.dataValues.percentPerLangEnglish + " %",
            ],
            [
              genericTranslations.pdfStructure.korean[langLocale],
              snapshotShopParams.dataValues.percentPerLangKorean + " %",
            ],
            [
              genericTranslations.pdfStructure.traditionalChinese[langLocale],
              snapshotShopParams.dataValues.percentPerLangTraditionalChinese +
                " %",
            ],
          ],
        },
        style: "recapTable",
        pageBreak: "after",
      },
      {
        text: genericTranslations.pdfStructure.cardsSetAtHigherPrice[
          langLocale
        ].toUpperCase(),
        style: "pageTitle",
      },
      {
        table: {
          headerRows: 1,
          widths: [
            70,
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
          ],
          body: [
            [
              genericTranslations.pdfStructure.cardName[langLocale],
              genericTranslations.pdfStructure.foil[langLocale],
              genericTranslations.pdfStructure.condition[langLocale],
              genericTranslations.pdfStructure.language[langLocale],
              genericTranslations.pdfStructure.oldPrice[langLocale],
              genericTranslations.pdfStructure.newPrice[langLocale],
              genericTranslations.pdfStructure.priceTrend[langLocale],
              genericTranslations.pdfStructure.foilPriceTrend[langLocale],
              "idProduct",
              "idArticle",
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
        text: genericTranslations.pdfStructure.cardsSetAtLowerPrice[
          langLocale
        ].toUpperCase(),
        style: "pageTitle",
      },
      {
        table: {
          headerRows: 1,
          widths: [
            70,
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
          ],
          body: [
            [
              genericTranslations.pdfStructure.cardName[langLocale],
              genericTranslations.pdfStructure.foil[langLocale],
              genericTranslations.pdfStructure.condition[langLocale],
              genericTranslations.pdfStructure.language[langLocale],
              genericTranslations.pdfStructure.oldPrice[langLocale],
              genericTranslations.pdfStructure.newPrice[langLocale],
              genericTranslations.pdfStructure.priceTrend[langLocale],
              genericTranslations.pdfStructure.foilPriceTrend[langLocale],
              "idProduct",
              "idArticle",
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
        text: genericTranslations.pdfStructure.cardsBlockedByPriceShield[
          langLocale
        ].toUpperCase(),
        style: "pageTitle",
      },
      {
        table: {
          headerRows: 1,
          widths: [
            70,
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
          ],
          body: [
            [
              genericTranslations.pdfStructure.cardName[langLocale],
              genericTranslations.pdfStructure.foil[langLocale],
              genericTranslations.pdfStructure.condition[langLocale],
              genericTranslations.pdfStructure.language[langLocale],
              genericTranslations.pdfStructure.oldPrice[langLocale],
              genericTranslations.pdfStructure.newPrice[langLocale],
              genericTranslations.pdfStructure.priceTrend[langLocale],
              genericTranslations.pdfStructure.foilPriceTrend[langLocale],
              "idProduct",
              "idArticle",
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
        text: genericTranslations.pdfStructure.cardsExcluded[
          langLocale
        ].toUpperCase(),
        style: "pageTitle",
      },
      {
        table: {
          headerRows: 1,
          widths: [
            70,
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
            "auto",
          ],
          body: [
            [
              genericTranslations.pdfStructure.cardName[langLocale],
              genericTranslations.pdfStructure.foil[langLocale],
              genericTranslations.pdfStructure.condition[langLocale],
              genericTranslations.pdfStructure.language[langLocale],
              genericTranslations.pdfStructure.oldPrice[langLocale],
              genericTranslations.pdfStructure.newPrice[langLocale],
              genericTranslations.pdfStructure.priceTrend[langLocale],
              genericTranslations.pdfStructure.foilPriceTrend[langLocale],
              "idProduct",
              "idArticle",
            ],
            ...generateLineExcludedCard(
              all_excluded_put_memories,
              printExplaination
            ),
          ],
        },
        style: "bigTableExcludedCards",
        pageBreak: "after",
      },
    ],
    footer: generateFooter,
    styles: {
      mainTitle: {
        alignment: "center",
        fontSize: 20,
      },
      subTitle: {
        alignment: "center",
      },
      sentenceRecapWithNumber: {
        alignment: "right",
        margin: [0, 0, 150, 0],
      },
      recapTable: {
        margin: [100, 0, 50, 0],
      },
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
      bigTableHigherPrice: { margin: [0, 0, 0, 0], fontSize: 10 },
      bigTableLowerPrice: { margin: [0, 0, 0, 0], fontSize: 10 },
      bigTablePricehieldBlockedCards: { margin: [10, 0, 0, 0], fontSize: 8 },
      bigTableExcludedCards: { margin: [0, 0, 0, 0], fontSize: 10 },
      footer: {
        alignment: "center",
        margin: [0, 0, 0, 10],
      },
      footerMention: {
        alignment: "center",
        fontSize: 10,
      },
    },
  };
  var options;

  var pdfDoc = printer.createPdfKitDocument(docDefinition, options);

  //Creating folder if it doesnt exist
  // sync, should be async, fine for now
  const folderPathWithUserId = path.join(
    __dirname + "../../../PDF_Storage/" + put_request.dataValues.idShop
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
      "/" +
        createPDFName(
          all_put_memories.rows[0].dataValues.idScript,
          put_request.dataValues.idShop,
          true
        )
    );
  } else {
    pdfPathName = path.join(
      folderPathWithUserId,
      "/" +
        createPDFName(
          all_put_memories.rows[0].dataValues.idScript,
          put_request.dataValues.idShop,
          false
        )
    );
  }
  // pdf writing
  pdfDoc.pipe(fs.createWriteStream(pdfPathName));
  pdfDoc.end();

  console.log("processing PDF...");
}

function createPDFName(idScript, idShop, isTest) {
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
  createPDFName,
};
