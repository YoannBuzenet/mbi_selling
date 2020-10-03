var express = require("express");
var router = express.Router();

router.get("/", async (req, res) => {
  //TODO : DO IT !
  const jwt = req.headers.authorization;
  const { getAllPrices } = require("../../controllers/priceGuideController");

  // getAllMcmIdAndLegalities(jwt);
  getAllPrices(jwt);
  res.json("getting MTG data EN MASSE !");
});

module.exports = router;
