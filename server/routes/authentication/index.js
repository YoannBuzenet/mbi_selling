var express = require("express");
var router = express.Router();

//General Routes
const loginRoutes = require("./authentication");
const tokenRefreshRoutes = require("./tokenRefresh");
const registerRoutes = require("./register");
const mailResetRoutes = require("./mailReset");

//Connecting to DB when arriving in
const { connect } = require("../../../database/connect");
connect();

router.use("/login", loginRoutes);
router.use("/token/refresh", tokenRefreshRoutes);
router.use("/register", registerRoutes);
router.use("/user", mailResetRoutes);

module.exports = router;
