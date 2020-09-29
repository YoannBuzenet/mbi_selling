var express = require("express");
var router = express.Router();

router.get("/", async (req, res) => {
  //TODO : DO IT !
  res.json("getting MTG data EN MASSE !");
});

module.exports = router;
