var express = require("express");
var router = express.Router();

//General Routes
const stripeRoutes = require("./payment");

//Connecting to DB when arriving in
const { connect } = require("../../../database/connect");
connect();

router.use("/payment", stripeRoutes);

module.exports = router;
