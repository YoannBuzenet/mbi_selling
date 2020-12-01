var express = require("express");
var router = express.Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const db = require("../../../models/index");
const securityCheckAPI = require("../../services/securityCheckAPI");
const { startScript } = require("../../controllers/scriptController");
const shopAPI = require("../../services/shopAPI");

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
  if (req.body.isTest === undefined || typeof req.body.isTest !== "boolean") {
    res
      .status(406)
      .json(
        "isTest prop (boolean) in payload is mandatory to launch a Script Execution."
      );
    return;
  }
  const { isTest } = req.body;

  if (!Array.isArray(req.body.formats)) {
    res.status(406).json("Formats must be an array.");
    return;
  }

  //Dictionnary of formats ID
  const allFormats = await db.Format.findAll();
  const reducer = (accumulator, currentValue) => [
    ...accumulator,
    currentValue.id,
  ];
  const arrayOfFormatId = allFormats.reduce(reducer, []);

  // console.log("arrayOfFormatId", arrayOfFormatId);

  //Does the formats passed in payload exist ? Let's check'em !
  for (let i = 0; i < req.body.formats.length; i++) {
    if (!arrayOfFormatId.includes(req.body.formats[i])) {
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

  /* ********************************* */
  /* **** GETTING NECESSARY DATA ***** */
  /* ********************************* */

  const shopData = await shopAPI.getShopData(idShop, jwt);

  // Checking the Expiration token from MKM is existant

  if (!shopData.ExpirationMkmToken) {
    res.status(406).json("MKM Expiration token is not defined.");
    return;
  } else if (shopData.ExpirationMkmToken * 1000 < Date.now()) {
    res.status(406).json("MKM Token is expired.");
    return;
  } else if (shopData.ExpirationMkmToken * 1000 + 3600000 < Date.now()) {
    res
      .status(406)
      .json("MKM Token will expire soon, please log again to regenerate it.");
    return;
  }

  /* ************************* */
  /* ********* LOGIC ********* */
  /* ************************* */

  // Core stuff
  startScript(idShop, idScript, isTest, shopData, req, res);

  // TODO
  // 1. envoi mail (prendre si c'est test ou non en param)
});

module.exports = router;
