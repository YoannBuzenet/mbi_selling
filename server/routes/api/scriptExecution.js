var express = require("express");
var router = express.Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const db = require("../../../models/index");
const securityCheckAPI = require("../../services/securityCheckAPI");
const shopAPI = require("../../services/shopAPI");
const mainQueue = require("../../queues/mainQueue");
const { rewindPutRequest } = require("../../controllers/scriptController");
const redis = require("redis");

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
  if (req.body.locale === undefined) {
    res.status(406).json("locale is mandatory to launch a Script Execution.");
    return;
  }
  if (!securityCheckAPI.checkLocale(req.body.locale)) {
    res.status(406).json("locale must be en-US or fr-FR.");
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
  const { isTest, locale } = req.body;

  if (!Array.isArray(req.body.formats)) {
    res.status(406).json("Formats must be an array.");
    return;
  }

  if (req.body.formats.length === 0) {
    res.status(406).json("There must be at least one format.");
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
  // Auth delegation - checking if the account is this shop (or a ROLE_ADMIN)
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
      idShop: idShop,
    },
  });

  if (scriptToCheck === null) {
    res
      .status(401)
      .json("Script doesnt exist, or you don't have access to it.");
    return;
  }

  /* ************************************************** */
  /* ****** Checking if the user is subscribed ******** */
  /* ************************************************** */
  const user = await db.User.findOne({
    where: {
      idShop: idShop,
    },
  });

  if (user === null) {
    res.status(406).json("User could not be found.");
    return;
  }

  if (
    user.dataValues.isSubscribedUntil &&
    new Date(user.dataValues.isSubscribedUntil) < new Date()
  ) {
    res.status(406).json("User is not subscribed.");
    return;
  }

  /* ************************************************** */
  /* ***** Checking if script is already running ****** */
  /* ************************************************** */
  if (scriptToCheck.dataValues.isRunning === 1) {
    res.status(406).json("Script is already running.");
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

  /* ****************************** */
  /* ********* Core stuff ********* */
  /* ****************************** */

  // Checking if redis is running
  const client = redis.createClient();
  client.on("error", function (err) {
    console.log("Error caught when checking connection : " + err);
  });
  if (!client.connected) {
    res.status(500).json("Redis not connected.");
    return;
  }

  //Marking the current script as Running
  db.Script.markAsRunning(idScript);

  // Adding a script execution to the queue
  // script if from scriptController
  mainQueue.mkmScriptsUpdateQueue.add({
    idShop,
    idScript,
    isTest,
    shopData,
    locale,
    formats: req.body.formats,
    jwt: req.headers.authorization,
  });

  res.status(200).json("Script Queued.");
});

router.post("/rewindPutRequest", async (req, res) => {
  /* ************************** */
  /* ****SECURITY & CHECKS**** */
  /* ************************ */

  securityCheckAPI.checkQueryParams(req, res, [
    "put_request_id",
    "idShop",
    "idScript",
  ]);

  let put_request_id = req.query.put_request_id;
  let idShop = req.query.idShop;
  let idScript = req.query.idScript;

  let jwt = req.headers.authorization;

  if (jwt === undefined) {
    res.status(406).json("Auth Header is missing !");
    return;
  }

  // Check 3 : JWT
  // Auth delegation - checking if the account is this shop (or a ROLE_ADMIN)
  const isAdmin = await securityCheckAPI.checkIfUserIsAdmin(jwt);

  if (!isAdmin) {
    res.status(401).json("You don't have access to this ressource.");
    return;
  }

  // Checking the script does exist
  // It may be a good idea to check if this script is associated with the idUser
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

  //Check that the put request was a real one and not a test
  const put_request = await db.PUT_Request.findOne({
    where: {
      id: put_request_id,
    },
  });

  if (put_request.dataValues.isReal === 0) {
    res.status(406).json("Ask put request is a test one, not a real one.");
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

  /* ****************************** */
  /* ********* Core stuff ********* */
  /* ****************************** */

  // Pause the queue
  await mainQueue.mkmScriptsUpdateQueue.pause();

  // Run rewind function
  await rewindPutRequest(put_request_id, shopData, idScript);

  // Resume the queue
  await mainQueue.mkmScriptsUpdateQueue.resume();

  res.status(200).json("Put Request " + put_request_id + " has been rewinded.");
});

module.exports = router;
