var express = require("express");
var router = express.Router();

//General Routes
const loginRoutes = require("./authentication");

//Connecting to DB when arriving in
const { connect } = require("../../../database/connect");
connect();

router.use("/login", loginRoutes);

module.exports = router;
