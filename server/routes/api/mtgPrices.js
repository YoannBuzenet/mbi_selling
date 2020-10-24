var express = require("express");
var router = express.Router();

/* ADMIN ENDPOINT */
router.get("/", async (req, res) => {
  const jwt = req.headers.authorization;

  if (jwt === undefined) {
    res.status(406).json("Auth Header is missing !");
  } else {
    //If there is a token, we remove the "Bearer" part
    jwt = jwt.split(" ");
    jwt = jwt[1];
  }

  // Auth delegation - checking if the account is a ROLE_ADMIN
  const isAdmin = await securityCheckAPI.checkIfUserIsAdmin(jwt);
  if (!isAdmin) {
    res.status(401).json("You don't have access to this ressource.");
  }

  const { getAllPrices } = require("../../controllers/priceGuideController");

  getAllPrices(jwt);
  res.json("Price in DB have been updated.");
});

module.exports = router;
