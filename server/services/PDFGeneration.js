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

async function generatePDFFromPutRequest(
  put_requestId,
  langLocale = "fr-FR",
  isTestScript = true
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
    },
  });

  const all_lower_price_put_memories = await db.put_memory.findAndCountAll({
    where: {
      PUT_Request_id: put_requestId,
      newPrice: {
        [Op.lt]: Sequelize.col("oldPrice"),
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
      behaviourChosen: "Excluded",
    },
  });

  //yooy -> get tous les formats de la put_request (relation!)

  //https://pdfmake.github.io/docs/document-definition-object/tables/
  //http://pdfmake.org/playground.html

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

  var printer = new PdfPrinter(fonts);
  var docDefinition = {
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
      { text: " " },
      { text: moment().format(translation.FormatDate[langLocale]) },
      { text: "Formats ciblés :" },
    ],
    styles: {
      mainTitle: {
        alignment: "center",
        fontSize: 20,
      },
      subTitle: {
        alignment: "center",
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
