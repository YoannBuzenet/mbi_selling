var express = require("express");
var router = express.Router();
const db = require("../../../../models/index");
const securityCheckAPI = require("../../../services/securityCheckAPI");

router.get(
  "/",
  async (req, res, next) => {
    /* ************************** */
    /* ****SECURITY & CHECKS**** */
    /* ************************ */

    securityCheckAPI.checkIsJWTThere(req, res);

    securityCheckAPI.checkQueryParams(req, res, ["idUser", "idScript"]);

    //Check that the requester is who he sayts he is OR is admin
    const userHasRightToAccess = await securityCheckAPI.checkIfUserIsThisOneOrAdmin(
      req.headers.authorization,
      req.query.idUser
    );
    console.log(userHasRightToAccess);
    if (!userHasRightToAccess) {
      res.status(401).json("User does not have access do this ressource.");
    }

    //Check that there is a script for this user
    const isThereAScriptForThisUser = await db.Script.findOne({
      where: {
        idShop: req.query.idUser,
      },
    });

    if (isThereAScriptForThisUser.length === 0) {
      res.status(401).json("User does not have access do this ressource.");
    }

    next();
  },

  async function (req, res) {
    /* ********************* */
    /* *****PROCESS******** */
    /* ******************* */

    const custom_rules = await db.Custom_Rule.findAll({
      where: {
        idScript: idScript,
      },
    });

    res.json(custom_rules);
  }
);

router.post(
  "/",
  async (req, res, next) => {
    /* ************************** */
    /* ****SECURITY & CHECKS**** */
    /* ************************ */

    securityCheckAPI.checkIsJWTThere(req, res);

    securityCheckAPI.checkQueryParams(req, res, ["idUser", "idScript"]);

    /* ************************** */
    /* ******PAYLOAD CHECK****** */
    /* ************************ */
    // Payload custom check for this endpoint
    if (Object.keys(req.body).length === 0) {
      res.status(406).json("Custom Rules payload is missing.");
    }
    console.log("red body :", req.body);
    if (req.body.id !== undefined) {
      res
        .status(406)
        .json("Custom Rules payload shouldn't have an id in POST requests.");
    }
    if (req.body.ruleType === undefined) {
      res.status(406).json("Custom Rules ruleType is mandatory.");
    }
    if (req.body.behaviour === undefined) {
      res.status(406).json("Custom Rules behaviour is mandatory.");
    }
    if (
      req.body.isForFoils === undefined ||
      req.body.isForSigned === undefined ||
      req.body.isForPlaysets === undefined
    ) {
      res
        .status(406)
        .json(
          "Custom Rules isForFoils criteria, or isForSigned, or isForPlaysets is missing."
        );
    }
    if (req.body.ruleType === "priceRange") {
      if (
        req.body.priceRangeFrom === undefined ||
        req.body.priceRangeTo === undefined ||
        req.body.priceRangeValueToSet === undefined
      ) {
        res
          .status(406)
          .json(
            "For Price Range rules, priceRangeFrom, priceRangeTo, priceRangeValueToSet are mandatory."
          );
      }
    }

    //Check that the requester is who he sayts he is OR is admin
    const userHasRightToAccess = await securityCheckAPI.checkIfUserIsThisOneOrAdmin(
      req.headers.authorization,
      req.query.idUser
    );
    console.log("has user right to access", userHasRightToAccess);
    if (!userHasRightToAccess) {
      res.status(401).json("User does not have access do this ressource.");
    }

    //Check that there is a script for this user
    const isThereAScriptForThisUser = await db.Script.findOne({
      where: {
        idShop: req.query.idUser,
      },
    });

    if (isThereAScriptForThisUser === null) {
      res.status(401).json("User does not have access do this ressource.");
    }
    next();
  },

  async function (req, res) {
    /* ********************* */
    /* *****PROCESS******** */
    /* ******************* */

    //Register Rule
    //Send it back with its id !
    db.Custom_Rule.create({
      idScript: req.query.idScript,
      ruleType: req.body.ruleType,
      priceRangeFrom: req.body.priceRangeFrom || null,
      priceRangeTo: req.body.priceRangeTo || null,
      priceRangeValueToSet: req.body.priceRangeValueToSet || null,
      behaviour: req.body.behaviour,
      priceRangePercentageFromMkm: req.body.priceRangePercentageFromMkm,
      isForFoils: req.body.isForFoils,
      isForSigned: req.body.isForSigned,
      isForPlaysets: req.body.isForPlaysets,
      mkmPriceGuideReference: req.body.mkmPriceGuideReference,
    })
      .then((resp) => console.log("what do we have here ?", resp))
      .catch((err) => console.log("didnt work bro", err));

    res.json("posted a custom rule ! here it is :");
  }
);

router.put("/:id", async (req, res) => {
  //TODO : DO IT !
  const jwt = req.headers.authorization;

  res.json("put a custom rule !");
});

module.exports = router;
