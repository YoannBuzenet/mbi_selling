var express = require("express");
var router = express.Router();

//General Routes
const loginRoutes = require("./authentication");
const tokenRefreshRoutes = require("./tokenRefresh");
const registerRoutes = require("./register");

//Connecting to DB when arriving in
const { connect } = require("../../../database/connect");
connect();

router.use("/login", loginRoutes);
router.use("/token/refresh", tokenRefreshRoutes);
router.use("/register ", registerRoutes);

module.exports = router;
