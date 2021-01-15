var express = require("express");
var router = express.Router();
const db = require("../../../../models/index");

router.post("/", async (req, res) => {
  //securitycheck
  //query param
  //check if it belongs to the right user
});

router.put("/", async (req, res) => {
  //securitycheck
  //query param
  //check if it belongs to the right user
});

module.exports = router;
