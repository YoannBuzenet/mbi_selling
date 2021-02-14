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
        idShop: refreskTokenOnMTGAPI.data.shop.id,
      },
    });

    for (let i = 0; i < userScripts.length; i++) {
      //Adding Format
      const scriptFormats = await userScripts[i].getFormats();
      userScripts[i].dataValues.formats = [...scriptFormats];

      //Adding keywords
      const scriptKeywords = await userScripts[i].getKeywords();
      userScripts[i].dataValues.keywords = [...scriptKeywords];

      //Adding rarities
      const scriptRarities = await userScripts[i].getrarities();
      userScripts[i].dataValues.rarities = [...scriptRarities];
    }

    let shop = await db.User.findOne({
      where: {
        idShop: refreskTokenOnMTGAPI.data.shop.id,
      },
    });

    // console.log("user scripts to be added :", userScripts);

    const userSellingShopParams = await db.shop_params.findOne({
      where: {
        idShop: refreskTokenOnMTGAPI.data.shop.id,
      },
    });

    const overloadedResponse = {
      ...refreskTokenOnMTGAPI.data,
      userScripts,
      sellingShopParams: userSellingShopParams,
      isSubscribedUntil: shop.dataValues.isSubscribedUntil,
      shopLocalData: {
        hasAlreadyLogged: shop.dataValues.hasAlreadyConnected,
      },
    };

    res.json(overloadedResponse);
  } catch (error) {
    console.log("error when adding data to refresh token", error);
    res.status(401).json(error);
    return;
  }
});

module.exports = router;
