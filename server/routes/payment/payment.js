var express = require("express");
var router = express.Router();

router.post("/", async (req, res) => {
  res.status(200).json("Payment has been proceeded.");
  return;
});

module.exports = router;
