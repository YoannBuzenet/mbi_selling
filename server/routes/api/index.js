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
const customrule_behaviour_definition = require("./Entities/customrule_behaviour_definition");
const customrule_ruletype_definition = require("./Entities/customrule_ruletype_definition");
const priceguideDefinition = require("./Entities/priceguideDefinition");

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
router.use("/customrule_behaviour_definition", customrule_behaviour_definition);
router.use("/customrule_ruletype_definition", customrule_ruletype_definition);
router.use("/priceguideDefinition", priceguideDefinition);

module.exports = router;
