var express = require("express");
var router = express.Router();
const db = require("../../../../models/index");
const securityCheckAPI = require("../../../services/securityCheckAPI");

//Get all scripts for one user
router.get("/getByUserId", async (req, res) => {
  /* ************************** */
  /* ****SECURITY & CHECKS**** */
  /* ************************ */

  securityCheckAPI.checkIsJWTThere(req, res);

  securityCheckAPI.checkQueryParams(req, res, "idUser");

  //Check that the requester is who he sayts he is OR is admin
  const userHasRightToAccess = await securityCheckAPI.checkIfUserIsThisOneOrAdmin(
    req.headers.authorization,
    req.query.idUser
  );
  console.log("user has the right to access : ", userHasRightToAccess);
  if (!userHasRightToAccess) {
    res.status(401).json("User does not have access do this ressource.");
    return;
  }

  /* ********************* */
  /* *****PROCESS******** */
  /* ******************* */

  const userScripts = await db.Script.findAll({
    where: {
      idShop: req.query.idUser,
    },
  });

  res.status(200).json(userScripts);
});

router.get("/getById/:id", async (req, res) => {
  /* ************************** */
  /* ****SECURITY & CHECKS**** */
  /* ************************ */

  securityCheckAPI.checkIsJWTThere(req, res);

  securityCheckAPI.checkQueryParams(req, res, "idUser");

  securityCheckAPI.checkType(req.params.id, "number");

  //Check that the requester is who he sayts he is OR is admin
  const userHasRightToAccess = await securityCheckAPI.checkIfUserIsThisOneOrAdmin(
    req.headers.authorization,
    req.query.idUser
  );
  console.log("user has the right to access : ", userHasRightToAccess);
  if (!userHasRightToAccess) {
    res.status(401).json("User does not have access do this ressource.");
    return;
  }

  /* ********************* */
  /* *****PROCESS******** */
  /* ******************* */

  const userScripts = await db.Script.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (userScripts === null) {
    res.status(404).json("This script does not exist.");
    return;
  }

  res.status(200).json(userScripts);
  return;
});

module.exports = router;
