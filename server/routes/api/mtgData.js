var express = require("express");
var router = express.Router();
const securityCheckAPI = require("../../services/securityCheckAPI");

/* ADMIN ENDPOINT */
router.get("/", async (req, res) => {
  let jwt = req.headers.authorization;

  if (jwt === undefined) {
    res.status(406).json("Auth Header is missing !");
  } else {
    //If there is a token, we remove the "Bearer" part
    jwt = jwt.split(" ");
    jwt = jwt[1];
  }

  // Check 3 : JWT
  // Auth delegation - checking if the account is a ROLE_ADMIN
  const isAdmin = await securityCheckAPI.checkIfUserIsAdmin(jwt);
  if (!isAdmin) {
    res.status(401).json("You don't have access to this ressource.");
  }

  const {
    getAllDatasInRAM,
    getAllFormatDefinition,
  } = require("../../controllers/mtgDataController");

  // getAllMcmIdAndLegalities(req.headers.authorization);

  getAllFormatDefinition(req.headers.authorization);
  res.json("Core MTG data dictionnary has been updated.");
});

module.exports = router;
