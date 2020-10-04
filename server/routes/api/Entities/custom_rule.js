var express = require("express");
var router = express.Router();
const db = require("../../../../models/index");
const securityCheckAPI = require("../../../services/securityCheckAPI");

router.get("/", async (req, res) => {
  /* ************************** */
  /* *****CHECK PARAMS******** */
  /* ************************ */

  let jwt = req.headers.authorization;
  if (jwt === undefined) {
    res.status(406).json("Auth Header is missing !");
  }

  //idUser en query param
  let idUser = parseInt(req.query.idUser);

  if (isNaN(idUser)) {
    res.status(406).json("idUser is missing");
  }

  //idScript en query param
  let idScript = parseInt(req.query.idScript);

  if (isNaN(idScript)) {
    res.status(406).json("idScript is missing");
  }

  /* ************************** */
  /* *****CHECK RIGHTS******** */
  /* ************************ */

  //Check that the requester is who he sayts he is OR is admin
  const userHasRightToAccess = await securityCheckAPI.checkIfUserIsThisOneOrAdmin(
    jwt,
    idUser
  );
  console.log(userHasRightToAccess);
  if (!userHasRightToAccess) {
    res.status(401).json("User does not have access do this ressource.");
  }

  //Check that there is a script for this user
  const isThereAScriptForThisUser = await db.Script.findOne({
    where: {
      idShop: idUser,
    },
  });

  if (isThereAScriptForThisUser.length === 0) {
    res.status(401).json("User does not have access do this ressource.");
  }

  /* ********************* */
  /* *****PROCESS******** */
  /* ******************* */

  const custom_rules = await db.Custom_Rule.findAll({
    where: {
      idScript: idScript,
    },
  });

  res.json(custom_rules);
});

router.post("/", async (req, res) => {
  //TODO : DO IT !
  const jwt = req.headers.authorization;

  res.json("post a custom rule !");
});

router.put("/:id", async (req, res) => {
  //TODO : DO IT !
  const jwt = req.headers.authorization;

  res.json("put a custom rule !");
});

module.exports = router;
