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
  console.log("user ", awesomeUser);

  awesomeUser.getScripts().then((script) => console.log(script));

  const awesomeScript = await db.Script.findOne({
    where: {
      id: 1,
    },
  });

  console.log(awesomeScript);

  awesomeScript.getCustom_Rules().then((C_rules) => console.log(C_rules));

  res.json("test endpoint !");
});

module.exports = router;
