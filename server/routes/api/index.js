var express = require("express");
var router = express.Router();

const mkmRoutes = require("./mkm");
const dbRoutes = require("./db");

router.use("/mkm", mkmRoutes);
router.use("/testConnection", dbRoutes);

module.exports = router;
