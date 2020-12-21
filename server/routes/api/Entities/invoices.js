var express = require("express");
var router = express.Router();
const db = require("../../../../models/index");

/* Public Route */
router.get("/getForShop", async (req, res) => {
  //query param : idShop
  // try JWT
  // get all invoices for one shop (via model)
});

module.exports = router;
