var express = require("express");
var router = express.Router();

const mkmRoutes = require("./mkm");
const dbRoutes = require("./db");
const mtgDataRoutes = require("./mtgData");

router.use("/mkm", mkmRoutes);
router.use("/testConnection", dbRoutes);
router.use("/mtgData", mtgDataRoutes);

module.exports = router;
