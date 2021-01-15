var express = require("express");
var router = express.Router();
const db = require("../../../../models/index");
const securityCheckAPI = require("../../../services/securityCheckAPI");

//Get all scripts for one user
/* Logged Route */
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
    include: db.Keyword,
  });

  res.status(200).json(userScripts);
});

//Get a script by Id
/* Logged Route */
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
    include: db.Keyword,
  });

  if (userScripts === null) {
    res.status(404).json("This script does not exist.");
    return;
  }

  const scriptFormats = await userScripts.getFormats();

  const finalReponse = { ...userScripts.dataValues, scriptFormats };

  res.status(200).json(finalReponse);
  return;
});

//Create a script
/* Logged Route */
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

  if (req.body.willBeBasedOn === undefined) {
    res.status(406).json("willBeBasedOn is mandatory.");
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

  try {
    const newScript = await db.Script.create({
      name: req.body.name,
      idShop: req.query.idUser,
      willBeBasedOn: req.body.willBeBasedOn,
    });

    if (req.body.formats) {
      console.log("they are formats to set");
      await newScript.setFormats(req.body.formats);
      newScript.save();
    }

    console.log(newScript);
    res.status(200).json(newScript);
    return;
  } catch (err) {
    console.log("error when creating a script", err);
    res.status(500).json(err);
    return;
  }
});

/* Logged Route */
router.patch("/:id", async (req, res) => {
  /* ************************** */
  /* ****SECURITY & CHECKS**** */
  /* ************************ */

  securityCheckAPI.checkIsJWTThere(req, res);

  securityCheckAPI.checkQueryParams(req, res, "idUser");

  if (req.params.id === undefined) {
    res.status(406).json("Script ID is mandatory for updating it.");
    return;
  }

  //Check the id of this script exists
  const existingScript = await db.Script.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (existingScript === null) {
    res
      .status(406)
      .json("Script with id " + req.params.id + " could not be found.");
    return;
  }

  /* ************************** */
  /* ******PAYLOAD CHECK****** */
  /* ************************ */
  // Payload custom check for this endpoint
  if (Object.keys(req.body).length === 0) {
    res.status(406).json("Script payload is missing.");
    return;
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

  existingScript.name = req.body.name;

  if (req.body.willBeBasedOn !== undefined) {
    existingScript.willBeBasedOn = req.body.willBeBasedOn;
  }

  //Check if we are setting formats from the script
  if (req.body.formats) {
    console.log("they are formats to set");
    existingScript.setFormats(req.body.formats);
  }

  existingScript
    .save()
    .then((resp) => {
      console.log("what do we have here ? IN PATCH : ", resp);
      res.status(200).json(resp.dataValues);
      return;
    })
    .catch((err) => {
      console.log("didnt work bro", err);
      res.status(500).json(err);
      return;
    });
});

/* Logged Route */
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
