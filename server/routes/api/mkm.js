var express = require("express");
var router = express.Router();
const mkmController = require("../../controllers/mkmController");
const securityCheckAPI = require("../../services/securityCheckAPI");
const axios = require("axios");

//Refresh MKM stock on local DB
router.get("/getMKMStockInCSV", async (req, res) => {
  // Check 1 : Params
  // Checking params are OK
  let idShop = parseInt(req.query.idShop);
  let idSet = parseInt(req.query.idSet);

  if (isNaN(idShop)) {
    res.status(406).json("idShop or idSet is missing");
  }
  // Check 2 : Headers
  // Checking the header
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

  // Check 4 : Shop
  // Getting info from shop AND checking it exists
  let shopData = await axios
    .get(process.env.REACT_APP_MTGAPI_URL + "/shops/" + idShop, {
      authorization: "Bearer " + jwt,
    })
    .catch((error) => {
      console.log(error);
      return false;
    });

  if (!shopData) {
    res.status(404).json("Shop doesn't exist.");
  }

  // getShopStock(shopData.data, setData.data, false);
  mkmController.getShopStock(shopData.data);

  res.status(200).json("OK");
});

router.get("/testopenAndLogCSV", async (req, res) => {
  //TODO pass this as dynamic
  const data = mkmController.registerStockFileIntoDB("LaBoutique", 1);

  res.status(200).json("CSV should be stored in DB now");
});

module.exports = router;
