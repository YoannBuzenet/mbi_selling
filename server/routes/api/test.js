var express = require("express");
var router = express.Router();
const db = require("../../../models/index");

router.get("/", async (req, res) => {
  //TODO : DO IT !
  const jwt = req.headers.authorization;

  console.log(db.Script);

  const script = await db.Script.findOne({
    where: {
      id: 1,
    },
  });

  const complete_data = await script.getFormats();

  console.log(complete_data);

  script.setFormats([2, 3]);

  res.json(script);
});

module.exports = router;
