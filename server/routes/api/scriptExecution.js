var express = require("express");
var router = express.Router();

router.get("/", async (req, res) => {
  //TODO - construction de l'ednpoint

  const jwt = req.headers.authorization;

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

  //Logique
  // Test si user a accès au script
  // Besoin d'id user, id script

  res.json("Script executed");
});

module.exports = router;
