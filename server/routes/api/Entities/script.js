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
    include: [db.Keyword, db.Rarity, db.Format],
  });

  res.status(200).json(userScripts);
  return;
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

  const scriptRarities = await userScripts.getRarities();

  const scriptExpansions = await userScripts.getExpansions();

  const finalReponse = {
    ...userScripts.dataValues,
    scriptFormats,
    rarities: scriptRarities,
    expansions: scriptExpansions,
  };

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
    res.status(406).json("name param is mandatory.");
    return;
  }

  if (req.body.willBeBasedOn === undefined) {
    res.status(406).json("willBeBasedOn param is mandatory.");
    return;
  }

  if (req.body.keywordBehaviour === undefined) {
    res.status(406).json("keywordBehaviour param is mandatory.");
    return;
  }

  if (req.body.rarities === undefined) {
    res.status(406).json("rarities param is mandatory.");
    return;
  }

  if (req.body.expansions === undefined) {
    res.status(406).json("expansions param is mandatory.");
    return;
  }

  if (!Array.isArray(req.body.rarities)) {
    res.status(406).json("rarities param must be an array.");
    return;
  }

  if (!Array.isArray(req.body.expansions)) {
    res.status(406).json("expansions param must be an array.");
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
      keywordBehaviour: req.body.keywordBehaviour,
    });

    if (req.body.formats) {
      console.log("they are formats to set", req.body.formats);
      await newScript.setFormats(req.body.formats);
    }
    if (req.body.rarities) {
      console.log("they are rarities to set", req.body.rarities);
      for (let i = 0; i < req.body.rarities.length; i++) {
        await newScript.createRarity({ name: req.body.rarities[i].name });
      }
    }
    if (req.body.expansions) {
      console.log("they are rarities to set", req.body.expansions);
      for (let i = 0; i < req.body.expansions.length; i++) {
        await newScript.createExpansion({ name: req.body.expansions[i] });
      }
    }

    await newScript.save();

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
      idShop: req.query.idUser,
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

  if (req.body.rarities === undefined) {
    res.status(406).json("rarities param is mandatory.");
    return;
  }
  if (req.body.expansions === undefined) {
    res.status(406).json("expansions param is mandatory.");
    return;
  }

  if (!Array.isArray(req.body.rarities)) {
    res.status(406).json("rarities param must be an array.");
    return;
  }
  if (!Array.isArray(req.body.expansions)) {
    res.status(406).json("expansions param must be an array.");
    return;
  }

  /* ********************* */
  /* *****PROCESS******** */
  /* ******************* */

  existingScript.name = req.body.name;

  if (req.body.willBeBasedOn !== undefined) {
    existingScript.willBeBasedOn = req.body.willBeBasedOn;
  }
  if (req.body.keywordBehaviour !== undefined) {
    existingScript.keywordBehaviour = req.body.keywordBehaviour;
  }

  //Check if we are setting formats from the script
  if (req.body.formats) {
    console.log("they are formats to set");
    existingScript.setFormats(req.body.formats);
  }

  if (req.body.rarities) {
    console.log("they are rarities to set");
    // For each received rarity, we check if it exists already or not.
    // If it exist already, we let it
    // If it doesn't exist, we create it
    for (let i = 0; i < req.body.rarities.length; i++) {
      const rarity = await db.Rarity.findOne({
        where: { name: req.body.rarities[i].name, idScript: req.params.id },
      });
      if (!rarity) {
        db.Rarity.create({
          name: req.body.rarities[i].name,
          idScript: req.params.id,
        });
      }
    }

    // Check to see if there are some rarities to delete
    // One reRarity already existing in DB but not in the payload should be deleted
    const existingRarities = await db.Rarity.findAll({
      where: { idScript: req.params.id },
    });
    for (let i = 0; i < existingRarities.length; i++) {
      const isRarityInPayload =
        req.body.rarities.filter(
          (rarityInPayload) => rarityInPayload.name === existingRarities[i].name
        ).length === 1;
      if (!isRarityInPayload) {
        existingRarities[i].destroy();
      }
    }
  }

  if (req.body.expansions) {
    console.log("they are expansions to set");
    // For each received rarity, we check if it exists already or not.
    // If it exist already, we let it
    // If it doesn't exist, we create it
    for (let i = 0; i < req.body.expansions.length; i++) {
      const expansion = await db.Expansion.findOne({
        where: { name: req.body.expansions[i], idScript: req.params.id },
      });
      if (!expansion) {
        db.Expansion.create({
          name: req.body.expansions[i],
          idScript: req.params.id,
        });
      }
    }

    // Check to see if there are some rarities to delete
    // One reRarity already existing in DB but not in the payload should be deleted
    const existingExpansions = await db.Expansion.findAll({
      where: { idScript: req.params.id },
    });
    for (let i = 0; i < existingExpansions.length; i++) {
      const isExpansionInPayload =
        req.body.expansions.filter(
          (expansionInPayload) =>
            expansionInPayload === existingExpansions[i].name
        ).length === 1;
      if (!isExpansionInPayload) {
        existingExpansions[i].destroy();
      }
    }
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
      idUser: req.query.idUser,
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
