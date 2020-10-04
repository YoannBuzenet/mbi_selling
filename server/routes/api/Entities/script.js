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

//Get a script by Id
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

//Create a script
router.post("/", async (req, res) => {
  /* ************************** */
  /* ****SECURITY & CHECKS**** */
  /* ************************ */

  securityCheckAPI.checkIsJWTThere(req, res);

  securityCheckAPI.checkQueryParams(req, res, "idUser");

  //check payload for name criteria presence
  // Payload custom check for this endpoint
  if (Object.keys(req.body).length === 0) {
    res.status(406).json("Script payload is missing.");
    return;
  }

  if (req.body.name === undefined) {
    res.status(406).json("Script Name is mandatory.");
    return;
  }

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

  db.Script.create({ name: req.body.name, idShop: req.query.idUser })
    .then((resp) => {
      console.log(resp);
      res.status(200).json(resp);
    })
    .catch((err) => {
      console.log("error when creating a script", err);
      res.status(500).json(err);
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
    res.status(406).json("Script ID is mandatory for deleting it.");
    return;
  }

  //Check the id of this custom rule exist
  const existingScript = await db.Script.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (existingScript === null) {
    res
      .status(406)
      .json("Script id " + req.params.id + "rule could not be found.");
    return;
  }

  //Delete
  existingScript
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
