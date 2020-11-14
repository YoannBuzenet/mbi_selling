async function generatePDFFromPutRequest(put_requestId) {
  var PdfPrinter = require("pdfmake");

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
        "../../server/PDF_handling/PDF_buffer/" +
          sellRequest.idSellRequest +
          ".pdf"
      )
    )
  );
  pdfDoc.end();

  console.log("processing PDF...");
}

module.exports = {
  generatePDFFromPutRequest,
};
