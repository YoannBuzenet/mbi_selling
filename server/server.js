// Core
require("dotenv").config();
require("dotenv").config({ path: "../.env.local" });
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const axios = require("axios");
const securityCheckAPI = require("./services/securityCheckAPI");
const fs = require("fs");

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "../build")));

//Parse each call
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Removing security check that can block in localhost (it blocks if https is missing)
if (process.env.NODE_ENV === "dev") {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
}

app.get("/api/testConnection", async (req, res) => {
  const { connect } = require("../database/connect");
  connect();
  res.json("OK");
});

//Update Set Prices on MKM
app.get("/api/updateSetPrice", async (req, res) => {
  // Check 1 : Params
  // Checking params are OK
  let idShop = parseInt(req.query.idShop);
  let idSet = parseInt(req.query.idSet);

  if (isNaN(idShop) || isNaN(idSet)) {
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
      // console.log(error);
      return false;
    });

  if (!shopData) {
    res.status(404).json("Shop doesn't exist.");
  }

  //Check 5 : Set
  //Getting priceguide for the set + check set exist
  let setData = await axios
    .get(process.env.REACT_APP_MTGAPI_URL + "/sets/" + idSet, {
      authorization: "Bearer " + jwt,
    })
    .catch((error) => {
      // console.log(error);
      return false;
    });

  if (!setData) {
    res.status(404).json("Set doesn't exist.");
  }

  //if everything is there ( set and shop and admin access), call the core function
  const mkmController = require("./controllers/mkmController");

  // getShopStock(shopData.data, setData.data, false);
  const { pathFile } = mkmController.getShopStock(shopData.data);

  res.status(200).json("OK");
});

// Handles any requests that don't match the ones above
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port);

console.log("App is listening on port " + port);
