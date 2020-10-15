var express = require("express");
var router = express.Router();

//General Routes
const loginRoutes = require("./authentication");
const tokenRefreshRoutes = require("./tokenRefresh");

//Connecting to DB when arriving in
const { connect } = require("../../../database/connect");
connect();

router.use("/login", loginRoutes);
router.use("/token/refresh", tokenRefreshRoutes);

module.exports = router;
