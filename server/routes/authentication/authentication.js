var express = require("express");
var router = express.Router();
var axios = require("axios");
const db = require("../../../models/index");

/* Login Route */
router.post("/", async (req, res) => {
  //Checking payload
  if (req.body.email === undefined || req.body.password === undefined) {
    res.status(406).json("Parameters are missing for connection.");
    return;
  }

  //We can add additional check at this step if necessary
  const credentials = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const loginOnMTGAPI = await axios.post(
      process.env.REACT_APP_MTGAPI_URL + "/login",
      credentials
    );
    console.log(loginOnMTGAPI.data);

    //Getting all scripts for this user and adding them to the API response

    let userScripts = await db.Script.findAll({
      where: {
        idShop: loginOnMTGAPI.data.user.id,
      },
    });

    for (let i = 0; i < userScripts.length; i++) {
      const scriptFormats = await userScripts[i].getFormats();
      userScripts[i].dataValues.formats = { ...scriptFormats };
    }

    console.log("user scripts to be added :", userScripts);

    const overloadedResponse = { ...loginOnMTGAPI.data, userScripts };

    res.json(overloadedResponse);
  } catch (error) {
    console.log(error);
    res.status(401).json("Access Denied.");
    return;
  }
});

module.exports = router;
