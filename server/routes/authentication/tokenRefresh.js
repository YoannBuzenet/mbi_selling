var express = require("express");
var router = express.Router();
var axios = require("axios");
const db = require("../../../models/index");

router.post("/", async (req, res) => {
  //Checking payload
  if (req.body.refresh_token === undefined) {
    res.status(406).json("Parameters are missing for token refresh.");
    return;
  }

  try {
    const refreskTokenOnMTGAPI = await axios.post(
      process.env.REACT_APP_MTGAPI_URL + "/token/refresh",
      { refresh_token: req.body.refresh_token }
    );
    console.log(refreskTokenOnMTGAPI.data);

    //Getting all scripts for this user and adding them to the API response

    const userScripts = await db.Script.findAll({
      where: {
        idShop: refreskTokenOnMTGAPI.data.user.id,
      },
    });

    // console.log("user scripts to be added :", userScripts);

    const overloadedResponse = { ...refreskTokenOnMTGAPI.data, userScripts };

    res.json(overloadedResponse);
  } catch (error) {
    console.log("error when adding data to refresh token", error);
    res.status(401).json(error);
    return;
  }
});

module.exports = router;