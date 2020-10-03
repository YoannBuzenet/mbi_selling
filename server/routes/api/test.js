var express = require("express");
var router = express.Router();
const db = require("../../../models/index");

router.get("/", async (req, res) => {
  //TODO : DO IT !
  const jwt = req.headers.authorization;

  const awesomeUser = await db.User.findOne({
    where: {
      idShop: 1,
    },
  });
  console.log(awesomeUser);

  awesomeUser.getScripts().then((script) => console.log(script));
  res.json("test endpoint !");
});

module.exports = router;
