const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const { createIntl, createIntlCache } = require("react-intl");
const genericTranslations = require("../../src/services/fullstackTranslations/genericTranslations");
const { createSummaryPDFName } = require("../services/PDFGeneration");

/* *********************************** */
/* ******* TRANSLATION CONTEXT ******* */
/* *********************************** */

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
    case "mailForgotten": {
      template =
        __basedir + "/mail_templates/" + locale + "/resetMailSendChallenge.ejs";
      break;
    }
    case "afterPayment": {
      template = __basedir + "/mail_templates/" + locale + "/afterPayment.ejs";
      break;
    }
    case "scriptHad0card": {
      template =
        __basedir + "/mail_templates/" + locale + "/scriptHad0card.ejs";
      break;
    }
    case "testScriptHad0card": {
      template =
        __basedir + "/mail_templates/" + locale + "/testScriptHad0card.ejs";
      break;
    }
    default: {
      throw new Error("Could not find corresponding template.");
    }
  }
  return template;
}

function getMailTitle(action, intl) {
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
      mailTitle = intl.formatMessage({
        id: "mail.sending.title.real",
        defaultMessage: "Your script has been executed.",
      });
      break;
    }
    case "register": {
      mailTitle = intl.formatMessage({
        id: "mail.sending.title.register",
        defaultMessage: "You just registered on mkmpriceupdater.com !",
      });
      break;
    }
    case "mailForgotten": {
      mailTitle = intl.formatMessage({
        id: "mail.sending.title.passwordForgotten",
        defaultMessage: "Reset your password",
      });
      break;
    }
    case "afterPayment": {
      mailTitle = intl.formatMessage({
        id: "mail.sending.title.afterPayment",
        defaultMessage: "Payment received",
      });
      break;
    }
    case "scriptHad0card": {
      mailTitle = intl.formatMessage({
        id: "mail.sending.title.scriptHad0card",
        defaultMessage: "Your script has been executed, but affected 0 card.",
      });
      break;
    }
    case "testScriptHad0card": {
      mailTitle = intl.formatMessage({
        id: "mail.sending.title.testScriptHad0card",
        defaultMessage:
          "Your test script has been executed, but affected 0 card.",
      });
      break;
    }
    default: {
      throw new Error("Could not find corresponding mailTitle.");
    }
  }

  return mailTitle;
}

function buildTemplateData(action, params, intl) {
  console.log("in building template data, action is :", action);
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
      if (params?.shop?.legalName === undefined) {
        console.error(
          "Missing parameter : shop LegalName in buildTempleData function"
        );
      }
      templateData = {
        shop: {
          legalName: params.shop.legalName,
        },
      };
      break;
    }
    case "mailForgotten": {
      if (params?.challenge === undefined) {
        console.error(
          "Missing parameter : challenge in buildTempleData function"
        );
      }
      templateData = { challenge: params.challenge };
      break;
    }
    case "afterPayment": {
      if (params?.order === undefined) {
        console.error("Missing parameter : order in buildTempleData function");
      }

      templateData = {
        order: {
          amount: params?.order?.amount,
          duration: params?.order?.duration,
          endDate: intl.formatDate(new Date(params?.order?.endDate), {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          }),
        },
      };
      break;
    }
    case "scriptHad0card": {
      templateData = {};
      break;
    }
    case "testScriptHad0card": {
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

function getPDF(action, locale, idShop, params) {
  let PDFData = [];
  switch (action) {
    case "summaryTestScript": {
      PDFData = [
        {
          filename: createSummaryPDFName(params.idScript, idShop, true),
          path: path.join(
            __dirname,
            "../../PDF_storage/" +
              idShop +
              "/" +
              createSummaryPDFName(params.idScript, idShop, true)
          ),
        },
      ];
      break;
    }
    case "summaryRealScript": {
      PDFData = [
        {
          filename: createSummaryPDFName(params.idScript, idShop, false),
          path: path.join(
            __dirname,
            "../../PDF_storage/" +
              idShop +
              "/" +
              createSummaryPDFName(params.idScript, idShop, false)
          ),
        },
      ];
      break;
    }
    case "scriptHad0card": {
      PDFData = [
        {
          filename: createSummaryPDFName(params.idScript, idShop, false),
          path: path.join(
            __dirname,
            "../../PDF_storage/" +
              idShop +
              "/" +
              createSummaryPDFName(params.idScript, idShop, false)
          ),
        },
      ];
      break;
    }
    case "testScriptHad0card": {
      PDFData = [
        {
          filename: createSummaryPDFName(params.idScript, idShop, false),
          path: path.join(
            __dirname,
            "../../PDF_storage/" +
              idShop +
              "/" +
              createSummaryPDFName(params.idScript, idShop, false)
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
  const mailTitle = getMailTitle(action, intl);

  //Find the right ejs template file
  const templatePath = getTemplate(action, locale);

  const templateData = buildTemplateData(action, params, intl);

  const attachedPdf = getPDF(action, locale, idShop, params);

  let htmlToSend;
  try {
    htmlToSend = await ejs.renderFile(templatePath, templateData, {
      async: true,
    });
  } catch (err) {
    console.log("error while sending mail", err);
  }

  console.log("html of the mail :", htmlToSend);

  let mailOpts = {
    from: process.env.MAIL_SENDING,
    to: shopMail,
    subject: mailTitle,
    html: htmlToSend,
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

  try {
    const msgSent = await transport.sendMail(mailOpts);
    console.log("mail info", msgSent);
  } catch (e) {
    console.log("errro while sending the mail", e);
  }
}

module.exports = {
  sendEmail,
};
