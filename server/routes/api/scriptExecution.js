var express = require("express");
var router = express.Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const db = require("../../../models/index");
const securityCheckAPI = require("../../services/securityCheckAPI");

router.post("/", async (req, res) => {
  /* ************************** */
  /* ****SECURITY & CHECKS**** */
  /* ************************ */

  securityCheckAPI.checkQueryParams(req, res, ["idShop", "idScript"]);

  let idShop = req.query.idShop;
  let idScript = req.query.idScript;

  let jwt = req.headers.authorization;

  if (jwt === undefined) {
    res.status(406).json("Auth Header is missing !");
    return;
  }

  //Check payload
  if (Object.keys(req.body).length === 0) {
    res.status(406).json("Script Execution payload is missing.");
    return;
  }
  if (req.body.formats === undefined) {
    res.status(406).json("Formats are mandatory to launch a Script Execution.");
    return;
  }
  if (!Array.isArray(req.body.formats)) {
    res.status(406).json("Formats must be an array.");
    return;
  }

  //Dictionnary of formats
  const allFormats = await db.Format.findAll();
  const reducer = (accumulator, currentValue) => [
    ...accumulator,
    currentValue.id,
  ];
  const arrayOfFormatId = allFormats.reduce(reducer, []);

  //Does the formats passed in payload exist ? Let's check'em !
  for (let i = 0; i < req.body.formats.length; i++) {
    if (!arrayOfFormatId.indludes(req.body.formats[i])) {
      res.status(406).json(`Formats n°${req.body.formats[i]} doesn't exist.`);
      return;
    }
  }

  // Check 3 : JWT
  // Auth delegation - checking if the account is a ROLE_ADMIN
  const isAdmin = await securityCheckAPI.checkIfUserIsThisOneOrAdmin(
    jwt,
    idShop
  );
  if (!isAdmin) {
    res.status(401).json("You don't have access to this ressource.");
    return;
  }

  //Script Existence Verification
  const scriptToCheck = await db.Script.findOne({
    where: {
      id: idScript,
    },
  });

  if (scriptToCheck === null) {
    res
      .status(401)
      .json("Script doesnt exist, or you don't have access to it.");
    return;
  }

  /* ************************** */
  /* ********* LOGIC ********** */
  /* ************************** */

  //Do we have already a stock for this user, and if yes, is it older than 24 hours ?

  const oneCardAtRandomFromStock = await db.MkmProduct.findOne({
    where: {
      idShop: idShop,
    },
  });

  if (
    oneCardAtRandomFromStock === null ||
    new Date(oneCardAtRandomFromStock.updatedAt).getTime() +
      process.env.TIME_TO_EXPIRE_STOCK <
      new Date().getTime()
  ) {
    //on get le stock via MKM
  }

  // Counting the number of cards concerned by this script

  let orConditionOnFormats = arrayOfFormatId.map((formatId) => ({
    [isLegal + "Commander"]: 1,
  }));

  const numberOfCardsToHandle = await db.MkmProduct.findAll({
    where: {
      idShop: req.body.idShop,
      [Op.or]: orConditionOnFormats,
      //isLegal via l'association productLegality
    },
  });

  console.log(numberOfCardsToHandle);

  // on en déduit le nombre de requetes qu'on va devoir effectuer grace à la taille du chunk

  //On continue la logique

  res.json("Script executed");
});

module.exports = router;
