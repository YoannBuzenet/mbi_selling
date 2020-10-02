var express = require("express");
var router = express.Router();

router.get("/", async (req, res) => {
  //TODO : DO IT !
  const jwt = req.headers.authorization;
  const {
    getAllDatasInRAM,
    getAllFormatDefinition,
  } = require("../../controllers/mtgDataController");

  // getAllMcmIdAndLegalities(jwt);
  getAllFormatDefinition(jwt);
  res.json("getting MTG data EN MASSE !");
});

module.exports = router;
