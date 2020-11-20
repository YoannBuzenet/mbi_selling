const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs");
const { createIntl, createIntlCache } = require("react-intl");
const genericTranslations = require("../../src/services/fullstackTranslations/genericTranslations");

async function mailPDF(idScript, idShop, isTest, locale = "fr-FR") {
  // test if parameters are here

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

  console.log("mailing...");

  //Find the right ejs template file

  // préparer l'objet mailOptions

  // choper le bon PDF

  // et go !

  let template;
  let templateData;

  const transport = nodemailer.createTransport({
    host: process.env.SMTP_NODEMAILER,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PASSWORD,
    },
  });

  ejs.renderFile(template, templateData, (err, html) => {
    if (err) console.log(err); // Handle error
    // console.log(templateData);
    // console.log(templateData.user.customer.SellRequests);
    // console.log(template);

    console.log(`HTML: ${html}`);

    let mailOpts = {
      from: "testMail@gmail.com",
      to: mailOptions.to,
      subject: mailOptions.subject,
      html: html,
      attachments: mailOptions.attachments,
    };

    if (securityCheckMailCanBeSent) {
      transport.sendMail(mailOpts, (err, info) => {
        if (err) console.log(err); //Handle Error
        console.log(info);
        fs.unlink(
          path.join(
            __dirname,
            "../../server/PDF_handling/PDF_buffer/" +
              templateData.sellRequest.id +
              ".pdf"
          )
        );
      });
      return true;
    }
    return false;
  });
}

module.exports = {
  mailPDF,
};
