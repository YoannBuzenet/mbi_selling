const { sendEmail } = require("../controllers/mailController");
const axios = require("axios");
const util = require("util");
const fs = require("fs");

async function pingMTGJSON() {
  const mtgJsonMetaData = await axios.get(
    "https://mtgjson.com/api/v5/Meta.json"
  );

  const mtgJsonVersion = mtgJsonMetaData.data.data.version;

  const writeFilePromisified = util.promisify(fs.writeFile);
  const readFilePromisified = util.promisify(fs.readFile);

  if (!fs.existsSync(`${process.cwd}/MTGJson`)) {
    fs.mkdirSync(`${process.cwd}/MTGJson`);
  }

  // continue here

  try {
    fileRead = await readFilePromisified(
      "./shopStock/" + idShop + "/stock.gzip"
    );
  } catch (error) {
    console.log("error while reading file", error);
    throw new Error("error while reading file", error);
  }

  try {
    await writeFilePromisified(pathFile, fileUnzipped, {
      encoding: "binary",
    });
  } catch (err) {
    console.log("error while writing 2 in file", err);
    throw new Error("error while writing 2 in file", err);
  }

  console.log("mtgJsonVersion", mtgJsonVersion);
  console.log("cwd", process.cwd());
  console.log("dirname", __dirname);
  // compare it with existing one
  // open the file if it exist
  //          Diff : mail
  //          same : skip
  // stock value, create path if it doesnt exist (mtgjsonMetaData.json)
}

pingMTGJSON();
