var express = require("express");
var router = express.Router();

const mkmRoutes = require("./mkm");
const dbRoutes = require("./db");
const mtgDataRoutes = require("./mtgData");

//Connecting to DB when arriving in /api
const { connect } = require("../../../database/connect");
connect();

router.use("/mkm", mkmRoutes);
router.use("/testConnection", dbRoutes);
router.use("/mtgData", mtgDataRoutes);

module.exports = router;
