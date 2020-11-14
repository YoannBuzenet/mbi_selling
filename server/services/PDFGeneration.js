var PdfPrinter = require("pdfmake");
var fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const db = require("../../models");

async function generatePDFFromPutRequest(put_requestId) {
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

  const all_higher_price_put_memories = await db.put_memory.findAndCountAll({
    where: {
      PUT_Request_id: put_requestId,
      newPrice: {
        [Op.gt]: Sequelize.col("oldPrice"),
      },
    },
  });

  console.log(all_higher_price_put_memories);

  // trouver les cartes qui ont baissé de prix

  // trouver les cartes bloquées par le priceshield

  // trouver les cartes exclues par les règles

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
  var docDefinition = { content: [], styles: {} };
  var options;

  var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
  pdfDoc.pipe(
    fs.createWriteStream(
      path.join(
        __dirname,
        "../../server/PDF_handling/PDF_buffer/" + "yooo_test" + ".pdf"
      )
    )
  );
  pdfDoc.end();

  console.log("processing PDF...");
}

module.exports = {
  generatePDFFromPutRequest,
};
