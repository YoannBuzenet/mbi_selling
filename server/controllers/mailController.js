const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const { createIntl, createIntlCache } = require("react-intl");
const genericTranslations = require("../../src/services/fullstackTranslations/genericTranslations");
const { createPDFName } = require("../services/PDFGeneration");

async function mailPDF(idScript, idShop, shopMail, isTest, locale = "fr-FR") {
  // test if parameters are here
  if (!idScript || !idShop || !shopMail || !isTest) {
    throw new Error("A parameter is missing in mail PDF function.");
  }

  // get shop mail

  /* *********************************** */
  /* ******* TRANSLATION CONTEXT ******* */
  /* *********************************** */

  // This is optional but highly recommended
  // since it prevents memory leak
  const cache = createIntlCache();

  const intl = createIntl(
    {
      // Locale of the application
      locale: locale,
      // Locale of the fallback defaultMessage
      messages: genericTranslations.translatedMessagesWithLocaleKey[locale],
    },
    cache
  );

  // create translated mail title
  let mailTitle;
  if (isTest) {
    mailTitle = intl.formatMessage({
      id: "mail.sending.title.test",
      defaultMessage: "Your test script has been executed.",
    });
  } else {
    mailTitle = intl.formatMessage({
      id: "mail.sending.title.real",
      defaultMessage: "Your script has been executed.",
    });
  }

  console.log("mailing...");

  //Find the right ejs template file
  let templatePath;
  if (isTest) {
    templatePath = __basedir + "/mail_templates/" + locale + "/test-pdf.ejs";
  } else {
    templatePath = __basedir + "/mail_templates/" + locale + "/real-pdf.ejs";
  }

  let templateData = {};

  let attachedPdf = [
    {
      filename: createPDFName(idScript, idShop, isTest),
      path: path.join(
        __dirname,
        "../../PDF_storage/" +
          idShop +
          "/" +
          createPDFName(idScript, idShop, isTest)
      ),
    },
  ];

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_NODEMAILER,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PASSWORD,
    },
  });

  ejs.renderFile(templatePath, templateData, (err, html) => {
    if (err) console.log(err); // Handle error
    // console.log(templateData);
    // console.log(templateData.user.customer.SellRequests);
    // console.log(template);

    console.log(`HTML: ${html}`);

    let mailOpts = {
      from: "testMail@gmail.com",
      to: shopMail,
      subject: mailTitle,
      html: html,
      attachments: attachedPdf,
    };

    transport.sendMail(mailOpts, (err, info) => {
      if (err) console.log(err); //Handle Error
      console.log(info);
      // fs.unlink(
      //   path.join(
      //     __dirname,
      //     "../../PDF_storage/" +
      //       idShop +
      //       "/" +
      //       createPDFName(idScript, idShop, isTest)
      //   ),
      //   (err, info) => {
      //     console.log("info une unlink", info);
      //     console.log("err in unlink", err);
      //   }
      // );
    });
    return true;
  });
}

module.exports = {
  mailPDF,
};
