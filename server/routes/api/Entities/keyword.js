var express = require("express");
var router = express.Router();
const db = require("../../../../models/index");
const securityCheckAPI = require("../../../services/securityCheckAPI");

router.post("/", async (req, res) => {
  securityCheckAPI.checkIsJWTThere(req, res);

  securityCheckAPI.checkQueryParams(req, res, ["idScript", "idUser"]);

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

  //Check that the script belongs to the user making request
  const userScript = await db.Script.findOne({
    where: {
      idShop: req.query.idUser,
      id: req.query.idScript,
    },
  });

  if (userScript === null) {
    res.status(401).json("Script doesnt belong to specified user.");
    return;
  }

  // Check payload for name prop
  if (req.body.name === undefined) {
    res.status(406).json("name prop in keyword is mandatory.");
    return;
  }

  //save in db, send back with id
  try {
    const registeredKeyword = await db.Keyword.create({
      idScript: req.query.idScript,
      name: req.body.name,
    });

    res.status(200).json(registeredKeyword);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.patch("/", async (req, res) => {
  securityCheckAPI.checkIsJWTThere(req, res);

  securityCheckAPI.checkQueryParams(req, res, ["idUser", "idScript"]);

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

  //Check that the script belongs to the user making request
  const userScript = await db.Script.findOne({
    where: {
      idShop: req.query.idUser,
      id: req.query.idScript,
    },
  });

  if (userScript === null) {
    res.status(401).json("Script doesnt belong to specified user.");
    return;
  } else {
    console.log("user HAS a script which is ", userScript);
  }

  // Check payload for name prop
  if (req.body.name === undefined) {
    res.status(406).json("name prop in keyword is mandatory.");
    return;
  }
  // Check payload for id prop
  if (req.body.id === undefined) {
    res.status(406).json("id prop in keyword is mandatory.");
    return;
  }

  const existingKeyword = await db.Keyword.findOne({
    where: {
      id: req.body.id,
      idScript: req.query.idScript,
    },
  });

  if (existingKeyword === null) {
    res.status(406).json("This keyword doesnt exist.");
    return;
  }

  // upating data
  existingKeyword.name = req.body.name;

  existingKeyword
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

router.delete("/:id", async (req, res) => {
  securityCheckAPI.checkIsJWTThere(req, res);

  securityCheckAPI.checkQueryParams(req, res, ["idUser", "idScript"]);

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

  //Check that the script belongs to the user making request
  const userScript = await db.Script.findOne({
    where: {
      idShop: req.query.idUser,
      id: req.query.idScript,
    },
  });

  if (userScript === null) {
    res.status(401).json("Script doesnt belong to specified user.");
    return;
  } else {
    console.log("user HAS a script which is ", userScript);
  }

  // Check id has been declared
  if (req.params.id === undefined) {
    res.status(406).json("id in params in keyword is mandatory.");
    return;
  }

  const existingKeyword = await db.Keyword.findOne({
    where: {
      id: req.params.id,
      idScript: req.query.idScript,
    },
  });

  if (existingKeyword === null) {
    res.status(406).json("This keyword doesnt exist.");
    return;
  }

  existingKeyword
    .destroy()
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

module.exports = router;
