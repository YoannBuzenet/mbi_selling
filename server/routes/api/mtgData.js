var express = require("express");
var router = express.Router();
const securityCheckAPI = require("../../services/securityCheckAPI");

/* ADMIN ENDPOINT */
router.get("/", async (req, res) => {
  let jwt = req.headers.authorization;

  if (jwt === undefined) {
    res.status(406).json("Auth Header is missing !");
    return;
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
    return;
  }

  // If JWT was an admin one, we create our own login to get a valid refresh token and corresponding JWT.

  const credentials = {
    email: process.env.LOG_SHOP_ADMIN,
    password: process.env.LOG_SHOP_PWD,
  };
  const servResp = await axios.post(
    `${process.env.REACT_APP_MTGAPI_URL}/login`,
    credentials
  );

  const { token, refresh_token } = servResp.data;

  const {
    getAllFormatDefinition,
  } = require("../../controllers/mtgDataController");

  // Getting all formats and all productLegality for it
  await getAllFormatDefinition(token, refresh_token);

  res.json("Core MTG data dictionnary has been updated.");
});

module.exports = router;
