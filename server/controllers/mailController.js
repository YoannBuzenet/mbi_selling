const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const { createIntl, createIntlCache } = require("react-intl");
const genericTranslations = require("../../src/services/fullstackTranslations/genericTranslations");
const { createSummaryPDFName } = require("../services/PDFGeneration");

function getTemplate(action, locale) {
  let template;
  switch (action) {
    case "summaryTestScript": {
      template = __basedir + "/mail_templates/" + locale + "/test-pdf.ejs";
      break;
    }
    case "summaryRealScript": {
      template = __basedir + "/mail_templates/" + locale + "/real-pdf.ejs";
      break;
    }
    case "register": {
      template = __basedir + "/mail_templates/" + locale + "/register.ejs";
      break;
    }
    default: {
      throw new Error("Could not find corresponding template.");
    }
  }
  return template;
}

function getMailTitle(action) {
  let mailTitle;
  switch (action) {
    case "summaryTestScript": {
      mailTitle = intl.formatMessage({
        id: "mail.sending.title.test",
        defaultMessage: "Your test script has been executed.",
      });
      break;
    }
    case "summaryRealScript": {
      mailTitle = mailTitle = intl.formatMessage({
        id: "mail.sending.title.real",
        defaultMessage: "Your script has been executed.",
      });
      break;
    }
    case "register": {
      mailTitle = mailTitle = intl.formatMessage({
        id: "mail.sending.title.register",
        defaultMessage: "You just registered on mkmpriceupdater.com !",
      });
      break;
    }
    default: {
      throw new Error("Could not find corresponding mailTitle.");
    }
  }

  return mailTitle;
}

function buildTemplateData(action, params) {
  //each case of witch should verify the params it needs and throw an error
  let templateData;
  switch (action) {
    case "summaryTestScript": {
      templateData = {};
      break;
    }
    case "summaryRealScript": {
      templateData = {};
      break;
    }
    case "register": {
      //shop.name will be needed
      templateData = {};
      break;
    }
    default: {
      throw new Error(
        "Could not find corresponding action for building templateData."
      );
    }
  }
  return templateData;
}

function getPDF(action, locale, idShop) {
  let PDFData = [];
  switch (action) {
    case "summaryTestScript": {
      PDFData = [
        {
          filename: createSummaryPDFName(idScript, idShop, isTest),
          path: path.join(
            __dirname,
            "../../PDF_storage/" +
              idShop +
              "/" +
              createSummaryPDFName(idScript, idShop, isTest)
          ),
        },
      ];
      break;
    }
    case "summaryRealScript": {
      PDFData = [
        {
          filename: createSummaryPDFName(idScript, idShop, isTest),
          path: path.join(
            __dirname,
            "../../PDF_storage/" +
              idShop +
              "/" +
              createSummaryPDFName(idScript, idShop, isTest)
          ),
        },
      ];
      break;
    }
    default: {
      console.log("no attachment for this email.");
    }
  }

  return PDFData;
}

async function sendEmail(
  action,
  idShop,
  shopMail,
  params = {},
  locale = "fr-FR"
) {
  // test if parameters are here
  if (!shopMail) {
    throw new Error("A parameter is missing in mail PDF function.");
  }

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
  const mailTitle = getMailTitle(action);

  //Find the right ejs template file
  const templatePath = getTemplate(action, locale);

  const templateData = buildTemplateData(action, params);

  const attachedPdf = getPDF(action, locale, idShop);

  ejs.renderFile(templatePath, templateData, (err, html) => {
    if (err) console.log(err); // Handle error
    // console.log(templateData);
    // console.log(templateData.user.customer.SellRequests);
    // console.log(template);

    console.log(`HTML: ${html}`);

    let mailOpts = {
      from: process.env.MAIL_SENDING,
      to: shopMail,
      subject: mailTitle,
      html: html,
      attachments: attachedPdf,
    };

    const transport = nodemailer.createTransport({
      host: process.env.SMTP_NODEMAILER,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASSWORD,
      },
    });

    transport.sendMail(mailOpts, (err, info) => {
      if (err) console.log(err); //Handle Error
      console.log(info);
      //TODO later: pass unlink behaviour in param
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
  });
}

module.exports = {
  sendEmail,
};
