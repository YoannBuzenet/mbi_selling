var express = require("express");
var router = express.Router();
var axios = require("axios");
const db = require("../../../models/index");
const {
  registerOnThisBackEndFromMTGAPI,
} = require("../../controllers/authController");

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

    // if the login is an admin, we just log him without searching for scripts
    if (loginOnMTGAPI.data.user.roles.includes("ROLE_ADMIN")) {
      res.json(loginOnMTGAPI.data).status(200);
      return;
    }

    //checking if this user is registered on mbi_selling
    let shop = await db.User.findOne({
      where: {
        idShop: loginOnMTGAPI.data.shop.id,
      },
    });

    if (shop === null) {
      console.log("accessing shop from api", loginOnMTGAPI.data.shop.baseLang);
      try {
        // Register user here FROM data FROM MTGAPI
        await registerOnThisBackEndFromMTGAPI(
          loginOnMTGAPI.data.shop.id,
          loginOnMTGAPI.data.shop.baseLang.id
        );
        shop = await db.User.findOne({
          where: {
            idShop: loginOnMTGAPI.data.shop.id,
          },
        });
      } catch (e) {
        console.log("error while registrating an user of the fly", e);
        res.status(500).json("Shop doesn't exist on mbi_selling.");
        return;
      }
    }
    //Getting all scripts for this user and adding them to the API response

    let userScripts = await db.Script.findAll({
      where: {
        idShop: loginOnMTGAPI.data.shop.id,
      },
    });

    for (let i = 0; i < userScripts.length; i++) {
      // Adding formats
      const scriptFormats = await userScripts[i].getFormats();
      userScripts[i].dataValues.formats = [...scriptFormats];
      //Adding keywords
      const scriptKeywords = await userScripts[i].getKeywords();
      userScripts[i].dataValues.keywords = [...scriptKeywords];
    }

    const userSellingShopParams = await db.shop_params.findOne({
      where: {
        idShop: loginOnMTGAPI.data.shop.id,
      },
    });

    // console.log("user scripts to be added :", userScripts);
    // console.log("shop.dataValues.isSubscribedUntil", shop.dataValues.isSubscribedUntil);

    const overloadedResponse = {
      ...loginOnMTGAPI.data,
      userScripts,
      sellingShopParams: userSellingShopParams,
      isSubscribedUntil: shop.dataValues.isSubscribedUntil,
    };

    res.json(overloadedResponse);
  } catch (error) {
    console.log("error when logging", error);
    res.status(401).json("Access Denied.");
    return;
  }
});

module.exports = router;
