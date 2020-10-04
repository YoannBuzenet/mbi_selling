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
    if (req.body.id !== undefined) {
      res
        .status(406)
        .json("Custom Rules payload shouldn't have an id in POST requests.");
    }
    if (req.body.ruleType === undefined) {
      res.status(406).json("Custom Rules ruleType is mandatory.");
    }
    if (
      req.body.isForFoils === undefined ||
      req.body.isForSigned === undefined ||
      req.body.isForPlaysets
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

    //Register Rule
    //Send it back with its id !

    // const custom_rules = await db.Custom_Rule.findAll({
    //   where: {
    //     idScript: idScript,
    //   },
    // });

    res.json("post a custom rule !");
  }
);

router.put("/:id", async (req, res) => {
  //TODO : DO IT !
  const jwt = req.headers.authorization;

  res.json("put a custom rule !");
});

module.exports = router;
