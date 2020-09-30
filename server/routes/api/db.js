var express = require("express");
var router = express.Router();

router.get("/", async (req, res) => {
  const { connect } = require("../../../database/connect");
  connect();
  res.json("OK");
});

module.exports = router;
