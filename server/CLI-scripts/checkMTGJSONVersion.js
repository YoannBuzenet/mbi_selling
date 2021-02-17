const { sendEmail } = require("../controllers/mailController");
const axios = require("axios");
const util = require("util");
const fs = require("fs");
const path = require("path");

async function pingMTGJSON() {
  const mtgJsonMetaData = await axios.get(
    "https://mtgjson.com/api/v5/Meta.json"
  );

  const mtgJsonVersion = mtgJsonMetaData.data.data.version;

  const writeFilePromisified = util.promisify(fs.writeFile);
  const readFilePromisified = util.promisify(fs.readFile);

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
    } else {
      // skip
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
