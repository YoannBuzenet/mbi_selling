var express = require("express");
var router = express.Router();

//General Routes
const mkmRoutes = require("./mkm");
const dbRoutes = require("./db");
const mtgDataRoutes = require("./mtgData");
const mtgPricesRoutes = require("./mtgPrices");
const scriptExecutionRoutes = require("./scriptExecution");

//Routes by Entities
const customRulesRoutes = require("./Entities/custom_rule");
const scriptRoutes = require("./Entities/script");
const customrule_behaviour_definition = require("./Entities/customrule_behaviour_definition");
const customrule_ruletype_definition = require("./Entities/customrule_ruletype_definition");
const priceguideDefinition = require("./Entities/priceguideDefinition");
const formatsDefinition = require("./Entities/format");
const invoicesHandling = require("./Entities/invoices");
const userHandling = require("./Entities/user");
const keywordsHandling = require("./Entities/keyword");
const shop_paramsHandling = require("./Entities/shop_params");

//Testing routes
const testRoutes = require("./test");

//Connecting to DB when arriving in /api
const { connect } = require("../../../database/connect");
connect();

router.use("/mkm", mkmRoutes);
router.use("/testConnection", dbRoutes);
router.use("/mtgData", mtgDataRoutes);
router.use("/mtgPrices", mtgPricesRoutes);
router.use("/scriptExecution", scriptExecutionRoutes);
router.use("/invoices", invoicesHandling);
router.use("/users", userHandling);
router.use("/keywords", keywordsHandling);
router.use("/shop_params", shop_paramsHandling);

//test purpose
if (process.env.NODE_ENV === "development") {
  router.use("/test", testRoutes);
}

// Entities Routes
router.use("/customRules", customRulesRoutes);
router.use("/script", scriptRoutes);
router.use("/customrule_behaviour_definition", customrule_behaviour_definition);
router.use("/customrule_ruletype_definition", customrule_ruletype_definition);
router.use("/priceguideDefinition", priceguideDefinition);
router.use("/formats", formatsDefinition);

module.exports = router;
