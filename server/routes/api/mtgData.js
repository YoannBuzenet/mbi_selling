var express = require("express");
var router = express.Router();

router.get("/", async (req, res) => {
  //TODO : DO IT !
  const jwt = req.headers.authorization;
  const {
    getAllMcmIdAndLegalities,
  } = require("../../controllers/mtgDataController");

  getAllMcmIdAndLegalities(jwt);

  res.json("getting MTG data EN MASSE !");
});

module.exports = router;
