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

async function generatePDFFromPutRequest(
  put_requestId,
  langLocale = "fr-FR",
  isTestScript = true,
  printExplaination = true
) {
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

  console.log("nos formats", usedFormats);

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
      behaviourChosen: "Excluded",
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
        text: "Page " + currentPage.toString() + " / " + pageCount,
        style: "footer",
      },
      { text: "MKM Price Updater", style: "footerMention" },
      { text: "www.mtginterface.com", style: "footerMention" },
    ];
  }

  //yooy
  function generateLineHigherPriceCard(data, shouldPrintExplaination) {
    let arrayWithAllData = [];

    for (let i = 0; i < data.rows.length; i++) {
      if (shouldPrintExplaination) {
        //Here we print all details

        arrayWithAllData = [
          ...arrayWithAllData,
          [
            "hausse",
            "hausse",
            "hausse",
            "hausse",
            "hausse",
            "hausse",
            "hausse",
            "hausse",
            "hausse",
            "hausse",
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
            "hausse",
            "hausse",
            "hausse",
            "hausse",
            "hausse",
            "hausse",
            "hausse",
            "hausse",
            "hausse",
            "hausse",
          ],
        ];
      }
    }

    return arrayWithAllData;
  }

  function generateLineLowerPriceCard(data, shouldPrintExplaination) {
    let arrayWithAllData = [];

    for (let i = 0; i < data.rows.length; i++) {
      if (shouldPrintExplaination) {
        //Here we print all details

        arrayWithAllData = [
          ...arrayWithAllData,
          [
            "baisse",
            "baisse",
            "baisse",
            "baisse",
            "baisse",
            "baisse",
            "baisse",
            "baisse",
            "baisse",
            "baisse",
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
            "baisse",
            "baisse",
            "baisse",
            "baisse",
            "baisse",
            "baisse",
            "baisse",
            "baisse",
            "baisse",
            "baisse",
          ],
        ];
      }
    }

    return arrayWithAllData;
  }
  function generateLineBlockedPriceCard(data, shouldPrintExplaination) {
    let arrayWithAllData = [];

    for (let i = 0; i < data.rows.length; i++) {
      if (shouldPrintExplaination) {
        //Here we print all details

        arrayWithAllData = [
          ...arrayWithAllData,
          [
            "blocked",
            "blocked",
            "blocked",
            "blocked",
            "blocked",
            "blocked",
            "blocked",
            "blocked",
            "blocked",
            "blocked",
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
            "blocked",
            "blocked",
            "blocked",
            "blocked",
            "blocked",
            "blocked",
            "blocked",
            "blocked",
            "blocked",
            "blocked",
          ],
        ];
      }
    }

    return arrayWithAllData;
  }
  function generateLineExcludedCard(data, shouldPrintExplaination) {
    let arrayWithAllData = [];

    for (let i = 0; i < data.rows.length; i++) {
      if (shouldPrintExplaination) {
        //Here we print all details

        arrayWithAllData = [
          ...arrayWithAllData,
          [
            "exclues",
            "exclues",
            "exclues",
            "exclues",
            "exclues",
            "exclues",
            "exclues",
            "exclues",
            "exclues",
            "exclues",
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
            "exclues",
            "exclues",
            "exclues",
            "exclues",
            "exclues",
            "exclues",
            "exclues",
            "exclues",
            "exclues",
            "exclues",
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
        text: "Script n° " + idScript,
        style: "mainTitle",
      },
      { text: " " },
      { text: isTestScript ? "Procédure de test" : " ", style: "subTitle" },
      { text: " " },
      { text: " " },
      { text: moment().format(translation.FormatDate[langLocale]) },
      { text: "Référence : " + put_requestId },
      { text: " " },
      {
        text:
          "Formats ciblés : " +
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
          body: [["Cartes concernées par le script", all_put_memories.count]],
        },
        layout: "noBorders",
        style: "recapTable",
      },
      { text: "Récapitulatif" },
      { text: " " },
      {
        table: {
          headerRows: 1,
          widths: [300, "auto"],
          body: [
            [
              "Cartes modifiées à la hausse",
              all_higher_price_put_memories.count,
            ],
            [
              "Cartes modifiées à la baisse",
              all_lower_price_put_memories.count,
            ],
            [
              "Cartes bloquées par le PriceShield",
              all_priceShield_blocked_put_memories.count,
            ],
            ["Cartes exclues par le script", all_excluded_put_memories.count],
          ],
        },
        layout: "noBorders",
        style: "recapTable",
        pageBreak: "after",
      },
      { text: "SUMMARY OF THE RULES USED", style: "pageTitle" },
      { text: "Regular cards", style: "tableTitle" },
      {
        table: {
          headerRows: 1,
          widths: [50, 50, 50, 50, 120, 120],
          body: [
            ["From", "To", "Action", "Value Set", "MKM Action", "Based on"],
            ...orderedSnapshotCustomRules.regular.map((rule) => {
              return [
                rule.priceRangeFrom,
                rule.priceRangeTo,
                ruleTypesDefinitionsDictionnary[rule.ruleTypeId].name,
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
      },
      { text: "Foil cards", style: "tableTitle" },
      {
        table: {
          headerRows: 1,
          widths: [50, 50, 50, 50, 120, 120],
          body: [
            ["From", "To", "Action", "Value Set", "MKM Action", "Based on"],
            ...orderedSnapshotCustomRules.foil.map((rule) => {
              return [
                rule.priceRangeFrom,
                rule.priceRangeTo,
                ruleTypesDefinitionsDictionnary[rule.ruleTypeId].name,
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
      { text: "PARAMETERS", style: "pageTitle" },
      { text: "Percent Per Condition Regular", style: "tableTitle" },
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
      { text: "Percent Per Condition Foil", style: "tableTitle" },
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
      { text: "Percent Per Language", style: "tableTitle" },
      {
        table: {
          headerRows: 1,
          widths: [300, "auto"],
          body: [
            [
              "German",
              snapshotShopParams.dataValues.percentPerLangGerman + " %",
            ],
            [
              "Spanish",
              snapshotShopParams.dataValues.percentPerLangSpanish + " %",
            ],
            [
              "French",
              snapshotShopParams.dataValues.percentPerLangFrench + " %",
            ],
            [
              "Italian",
              snapshotShopParams.dataValues.percentPerLangItalian + " %",
            ],
            [
              "Japanese",
              snapshotShopParams.dataValues.percentPerLangJapanese + " %",
            ],
            [
              "Portuguese",
              snapshotShopParams.dataValues.percentPerLangPortuguese + " %",
            ],
            [
              "Russian",
              snapshotShopParams.dataValues.percentPerLangRussian + " %",
            ],
            [
              "Simplified Chinese",
              snapshotShopParams.dataValues.percentPerLangSimplifiedChinese +
                " %",
            ],
            [
              "English",
              snapshotShopParams.dataValues.percentPerLangEnglish + " %",
            ],
            [
              "Korean",
              snapshotShopParams.dataValues.percentPerLangKorean + " %",
            ],
            [
              "Traditional Chinese",
              snapshotShopParams.dataValues.percentPerLangTraditionalChinese +
                " %",
            ],
          ],
        },
        style: "recapTable",
        pageBreak: "after",
      },
      { text: "CARTES MODIFEES A LA HAUSSE", style: "pageTitle" },
      {
        table: {
          headerRows: 1,
          widths: [
            300,
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
              "Card Name",
              "Foil",
              "Condition",
              "Language",
              "OldPrice",
              "New Price",
              "Price trend",
              "Foil Price Trend",
              "idProduct",
              "idArticle",
            ],
            ...generateLineHigherPriceCard(
              all_higher_price_put_memories,
              printExplaination
            ),
          ],
        },
        style: "recapTable2",
        pageBreak: "after",
      },
      { text: "CARTES MODIFEES A LA BAISSE", style: "pageTitle" },
      {
        table: {
          headerRows: 1,
          widths: [
            300,
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
              "Card Name",
              "Foil",
              "Condition",
              "Language",
              "OldPrice",
              "New Price",
              "Price trend",
              "Foil Price Trend",
              "idProduct",
              "idArticle",
            ],
            ...generateLineLowerPriceCard(
              all_lower_price_put_memories,
              printExplaination
            ),
          ],
        },
        style: "recapTable3",
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
        "shop_" +
        put_request.dataValues.idShop +
        "_" +
        "script_" +
        all_put_memories.rows[0].dataValues.idScript +
        "_" +
        "Test" +
        ".pdf"
    );
  } else {
    pdfPathName = path.join(
      folderPathWithUserId,
      "/" +
        "shop_" +
        put_request.dataValues.idShop +
        "_" +
        "script_" +
        all_put_memories.rows[0].dataValues.idScript +
        "_" +
        "Real" +
        ".pdf"
    );
  }
  // pdf writing
  pdfDoc.pipe(fs.createWriteStream(pdfPathName));
  pdfDoc.end();

  console.log("processing PDF...");
}

module.exports = {
  generatePDFFromPutRequest,
};
