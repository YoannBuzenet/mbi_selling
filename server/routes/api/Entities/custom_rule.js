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
    console.log("has user right to access", userHasRightToAccess);
    if (!userHasRightToAccess) {
      res
        .status(401)
        .json("User does not have access do this ressource or doesn't exist.");
      return;
    }

    //Check that there is a script for this user
    const isThereAScriptForThisUser = await db.Script.findOne({
      where: {
        idShop: req.query.idUser,
        id: req.query.idScript,
      },
    });

    console.log(
      "has user access to that script ? whats inside the call ?",
      isThereAScriptForThisUser
    );

    if (isThereAScriptForThisUser === null) {
      res.status(401).json("User does not have access do this ressource.");
      return;
    }

    next();
  },

  async function (req, res) {
    /* ********************* */
    /* *****PROCESS******** */
    /* ******************* */

    const custom_rules = await db.Custom_Rule.findAll({
      where: {
        idScript: req.query.idScript,
      },
    });

    res.status(200).json(custom_rules);
    return;
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
      return;
    }
    console.log("red body :", req.body);
    if (req.body.id !== undefined) {
      res
        .status(406)
        .json("Custom Rules payload shouldn't have an id in POST requests.");
      return;
    }
    if (req.body.ruleTypeId === undefined) {
      res.status(406).json("Custom Rules ruleType is mandatory.");
      return;
    }
    if (req.body.behaviourId === undefined) {
      res.status(406).json("Custom Rules behaviour is mandatory.");
      return;
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
      return;
    }
    if (req.body.ruleTypeId === 1) {
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
        return;
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
      return;
    }

    //Check that there is a script for this user
    const isThereAScriptForThisUser = await db.Script.findOne({
      where: {
        idShop: req.query.idUser,
      },
    });

    console.log(
      "is there a script for this user ? ",
      isThereAScriptForThisUser
    );

    if (isThereAScriptForThisUser === null) {
      res.status(401).json("User does not have access do this ressource.");
      return;
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
      ruleTypeId: req.body.ruleTypeId,
      priceRangeFrom: req.body.priceRangeFrom || null,
      priceRangeTo: req.body.priceRangeTo || null,
      priceRangeValueToSet: req.body.priceRangeValueToSet || null,
      behaviourId: req.body.behaviourId,
      priceRangePercentageFromMkm: req.body.priceRangePercentageFromMkm,
      isForFoils: req.body.isForFoils,
      isForSigned: req.body.isForSigned,
      isForPlaysets: req.body.isForPlaysets,
      mkmPriceGuideReference: req.body.mkmPriceGuideReference,
    })
      .then((resp) => {
        console.log("what do we have here ?", resp);
        res.status(200).json(resp.dataValues);
      })
      .catch((err) => {
        console.log("didnt work bro", err);
        res.status(500).json(err);
      });
  }
);

router.patch("/:id", async (req, res) => {
  /* ************************** */
  /* ****SECURITY & CHECKS**** */
  /* ************************ */

  securityCheckAPI.checkIsJWTThere(req, res);

  securityCheckAPI.checkQueryParams(req, res, "idUser");

  if (req.params.id === undefined) {
    res.status(406).json("Custom rule ID is mandatory for updating it.");
    return;
  }

  //Check the id of this custom rule exist
  const existingCustomRule = await db.Custom_Rule.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (existingCustomRule === null) {
    res
      .status(406)
      .json("Custom with id " + req.params.id + "rule could not be found.");
    return;
  }

  /* ************************** */
  /* ******PAYLOAD CHECK****** */
  /* ************************ */
  // Payload custom check for this endpoint
  if (Object.keys(req.body).length === 0) {
    res.status(406).json("Custom Rules payload is missing.");
    return;
  }

  if (req.body.ruleType === undefined) {
    res.status(406).json("Custom Rules ruleType is mandatory.");
    return;
  }
  if (req.body.behaviour === undefined) {
    res.status(406).json("Custom Rules behaviour is mandatory.");
    return;
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
    return;
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
      return;
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
    return;
  }

  /* ********************* */
  /* *****PROCESS******** */
  /* ******************* */
  //Register Rule
  //Send it back with its id !
  existingCustomRule.ruleType = req.body.ruleType;
  existingCustomRule.priceRangeFrom = req.body.priceRangeFrom;
  existingCustomRule.priceRangeTo = req.body.priceRangeTo;
  existingCustomRule.priceRangeValueToSet = req.body.priceRangeValueToSet;
  existingCustomRule.behaviour = req.body.behaviour;
  existingCustomRule.priceRangePercentageFromMkm =
    req.body.priceRangePercentageFromMkm;
  existingCustomRule.isForFoils = req.body.isForFoils;
  existingCustomRule.isForSigned = req.body.isForSigned;
  existingCustomRule.isForPlaysets = req.body.isForPlaysets;
  existingCustomRule.mkmPriceGuideReference = req.body.mkmPriceGuideReference;
  existingCustomRule
    .save()
    .then((resp) => {
      console.log("what do we have here ? IN PUT : ", resp);
      res.status(200).json(resp.dataValues);
    })
    .catch((err) => {
      console.log("didnt work bro", err);
      res.status(500).json(err);
      return;
    });
});

router.delete("/:id", async (req, res) => {
  console.log("on delete !");
  /* ************************** */
  /* ****SECURITY & CHECKS**** */
  /* ************************ */

  securityCheckAPI.checkIsJWTThere(req, res);

  securityCheckAPI.checkQueryParams(req, res, "idUser");

  if (req.params.id === undefined) {
    res.status(406).json("Custom rule ID is mandatory for deleting it.");
    return;
  }

  //Check the id of this custom rule exist
  const existingCustomRule = await db.Custom_Rule.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (existingCustomRule === null) {
    res
      .status(406)
      .json("Custom with id " + req.params.id + "rule could not be found.");
    return;
  }

  //Delete
  existingCustomRule
    .destroy()
    .then((resp) => {
      res.status(200).json(resp.dataValues);
      console.log("test");
      return;
    })
    .catch((err) => {
      console.log("while deleting", err);
      res.status(500).json(err);
      return;
    });
});

module.exports = router;
