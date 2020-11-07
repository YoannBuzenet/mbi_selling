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

  //Check Refresh Token in payload
  if (req.body.refresh_token === undefined) {
    res.status(406).json("Refresh token is missing in payload.");
    return;
  }

  const refresh_token = req.body.refresh_token;

  // Auth delegation - checking if the account is a ROLE_ADMIN
  const isAdmin = await securityCheckAPI.checkIfUserIsAdmin(jwt);
  if (!isAdmin) {
    res.status(401).json("You don't have access to this ressource.");
    return;
  }

  const { getAllPrices } = require("../../controllers/priceGuideController");

  await getAllPrices(req.headers.authorization, refresh_token);
  res.json("Price in DB have been updated.");
});

module.exports = router;
