var express = require("express");
var router = express.Router();
const db = require("../../../models/index");
const securityCheckAPI = require("../../services/securityCheckAPI");

router.get("/", async (req, res) => {
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

  //Logic

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
    //on get le stock
  }

  //On continue la logique

  res.json("Script executed");
});

module.exports = router;
