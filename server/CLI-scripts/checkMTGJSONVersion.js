const axios = require("axios");
const util = require("util");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");
const result = require("dotenv").config({
  path: path.resolve(process.cwd(), "./.env.local"),
});
if (result.error) {
  throw result.error;
}

async function pingMTGJSON() {
  const mtgJsonMetaData = await axios.get(
    "https://mtgjson.com/api/v5/Meta.json"
  );

  const mtgJsonVersion = mtgJsonMetaData.data.data.version;

  const writeFilePromisified = util.promisify(fs.writeFile);

  if (!fs.existsSync(`${process.cwd()}/MTGJson`)) {
    fs.mkdirSync(`${process.cwd()}/MTGJson`);
  }

  try {
    const pathToRead = path.join(process.cwd(), "MTGJson", "MetaData.json");

    let fileRead = fs.readFileSync(pathToRead);
    fileRead = JSON.parse(fileRead);

    const storedVersionOfMTGJSON = fileRead?.data?.version;

    if (mtgJsonVersion !== storedVersionOfMTGJSON) {
      // mail yoann avec les 2 versions et la date
      console.log("dates are differents");

      let mailOpts = {
        from: process.env.MAIL_SENDING,
        to: "ybuzenet@gmail.com",
        subject: "MTGJSON version has changed",
        html: `<h1>Hi Yoann,</h1><p>MTGJSON data has changed and needs to be updated. Version is now ${mtgJsonVersion} instead of ${storedVersionOfMTGJSON}.</p>`,
        attachments: [],
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

      const msgSent = await transport.sendMail(mailOpts);
      console.log("message sent : ", msgSent);
    } else {
      // If version is the same as stored, we skip.
      console.log("dates are the same");
    }
  } catch (error) {
    console.log("error while reading MTG JSON file", error);
  }

  try {
    const pathToWrite = path.join(process.cwd(), "MTGJson", "MetaData.json");

    await writeFilePromisified(
      pathToWrite,
      JSON.stringify(mtgJsonMetaData.data),
      {
        encoding: "binary",
      }
    );
  } catch (err) {
    console.log("error while writing MTG JSON in file", err);
  }
}

pingMTGJSON();

module.exports = {
  pingMTGJSON,
};
