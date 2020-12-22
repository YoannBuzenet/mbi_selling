var express = require("express");
var router = express.Router();
const db = require("../../../../models/index");
const axios = require("axios");

/* Shop Route */
// Put data on MTG API
router.put("/userShop", async (req, res) => {
  // receive data
  // send it to mtg api
  // send 200 to front
});

module.exports = router;
