var express = require("express");
var router = express.Router();
const { registerUser } = require("../../controllers/authController");
const db = require("../../../models/index");
const {
  createPremadeScriptsForShop,
} = require("../../controllers/shopController");
const { sendEmail } = require("../../controllers/mailController");
const { createShopKey } = require("../../services/utils");

//TODO Add a google recapatcha v3 here

router.post("/", async (req, res) => {
  //Checking payload
  if (
    req.body.email === undefined ||
    req.body.password === undefined ||
    req.body.legalName === undefined ||
    req.body.addressStreet === undefined ||
    req.body.postalCode === undefined ||
    req.body.town === undefined ||
    req.body.languageUsed === undefined
  ) {
    res.status(406).json("Parameters are missing to register User.");
    return;
  }

  const shopKeyCreated = createShopKey();

  // console.log("get data from front");
  let userCredentials = {
    email: req.body.email,
    password: req.body.password,
    legalName: req.body.legalName,
    addressStreet: req.body.addressStreet,
    postalCode: req.body.postalCode,
    town: req.body.town,
    vat: req.body.vat,
    languageUsed: req.body.languageUsed || "en-US",
    shopKey: shopKeyCreated,
  };

  try {
    const didUserRegister = await registerUser(userCredentials);
    console.log("didUserRegister", didUserRegister);
    const shopIdOnMTGI = parseInt(didUserRegister.data.shop.substring(7));

    //register user in our DB too
    const userCreated = await db.User.create({
      idShop: shopIdOnMTGI,
      shopKey: shopKeyCreated,
    });

    // mail user
    sendEmail(
      "register",
      userCreated.dataValues.id,
      req.body.email,
      {
        shop: {
          legalName: req.body.legalName,
        },
      },
      req.body.languageUsed
    );

    // Create premade scripts for user
    await createPremadeScriptsForShop(
      shopIdOnMTGI,
      req.body.languageUsed || "en-US"
    );
  } catch (error) {
    console.log("error during registering User", error);
    res.status(500).json("An error occured during registering.");
    return;
  }

  res.status(200).json("User has been registered.");
  return;
});

module.exports = router;
