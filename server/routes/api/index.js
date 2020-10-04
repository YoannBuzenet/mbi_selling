var express = require("express");
var router = express.Router();

//General Routes
const mkmRoutes = require("./mkm");
const dbRoutes = require("./db");
const mtgDataRoutes = require("./mtgData");
const mtgPricesRoutes = require("./mtgPrices");
const testRoutes = require("./test");

//Routes by Entities
const customRulesRoutes = require("./Entities/custom_rule");
const scriptRoutes = require("./Entities/script");

//Connecting to DB when arriving in /api
const { connect } = require("../../../database/connect");
connect();

router.use("/mkm", mkmRoutes);
router.use("/testConnection", dbRoutes);
router.use("/mtgData", mtgDataRoutes);
router.use("/mtgPrices", mtgPricesRoutes);
router.use("/test", testRoutes);

// Entities Routes
router.use("/customRules", customRulesRoutes);
router.use("/script", scriptRoutes);

module.exports = router;
