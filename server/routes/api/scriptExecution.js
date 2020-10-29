var express = require("express");
var router = express.Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const db = require("../../../models/index");
const securityCheckAPI = require("../../services/securityCheckAPI");
const axios = require("axios");
const mkmController = require("../../controllers/mkmController");
const definitionsAPI = require("../../../src/services/definitionsAPI");

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

  /* ************************** */
  /* ********* LOGIC ********** */
  /* ************************** */

  //Do we have already a stock for this user, and if yes, is it older than 24 hours ?

  const oneCardAtRandomFromStock = await db.MkmProduct.findOne({
    where: {
      idShop: idShop,
    },
  });

  /* **************************************** */
  /* *****Refreshing the stock if needed ******/
  /* **************************************** */

  if (
    oneCardAtRandomFromStock === null ||
    new Date(oneCardAtRandomFromStock.updatedAt).getTime() +
      process.env.TIME_TO_EXPIRE_STOCK <
      new Date().getTime()
  ) {
    console.log("We refresh the shop stock");
    let axiosConfig = {
      headers: {
        Authorization: req.headers.authorization,
      },
    };
    // on choppe les shopinfo sur mtgapi avec le jwt
    const shopdataRequest = await axios
      .get(process.env.REACT_APP_MTGAPI_URL + "/shops/" + idShop, axiosConfig)
      .catch((err) =>
        console.log("error when trying to get shop data from mtgAPI", err)
      );
    // console.log("shopdata from axios call", shopdataRequest);

    //on get le stock via MKM
    await mkmController.getShopStock(shopdataRequest.data, idShop);
  }

  console.log("we passed the stock refresh step");

  /* ******************************************* */
  /* Loading custom rules for the current Script */
  /* ******************************************* */

  const allCustomRules = await db.Custom_Rule.findAll({
    where: {
      idScript: idScript,
    },
  });
  // console.log("all custom rules", allCustomRules);

  // TO DO

  //Les ranger & Vérifier leur cohérences

  /* **************************************** */
  /* ********** Chunk Management ***********/
  /* **************************************** */

  // Counting the number of cards concerned by this script

  const formatDictionnary = await definitionsAPI.getFormatsAndReturnHashtable();

  let formatFilter = {};

  for (let i = 0; i < req.body.formats.length; i++) {
    formatFilter["isLegal" + formatDictionnary[req.body.formats[i]]] = 1;
  }

  console.log("format filter", formatFilter);

  const numberOfCardsToHandle = await db.MkmProduct.findAndCountAll(
    {
      include: [
        {
          model: db.productLegalities,
          where: {
            [Op.or]: formatFilter,
          },
        },
      ],
      where: {
        idShop: idShop,
      },
    },
    {}
  );

  // Saving by chunks
  const chunkSize = 100;

  //TO DO -> passer dans les custom rules en log(n) et enregistrer dans put memory

  //Envoi Mail TO DO

  res.json("Script executed");
});

module.exports = router;
