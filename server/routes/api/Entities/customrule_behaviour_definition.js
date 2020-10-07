var express = require("express");
var router = express.Router();
const db = require("../../../../models/index");

/* Public Route */
router.get("/getDefinitions", async (req, res) => {
  db.customRule_behaviour_definition
    .findAll()
    .then((resp) => {
      console.log(resp);
      res.status(200).json(resp);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

module.exports = router;
