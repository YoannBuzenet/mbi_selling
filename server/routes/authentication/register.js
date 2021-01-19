var express = require("express");
var router = express.Router();
const { registerUser } = require("../../controllers/authController");
const db = require("../../../models/index");

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

  // console.log("get data from front");
  let userCredentials = {
    email: req.body.email,
    password: req.body.password,
    legalName: req.body.legalName,
    addressStreet: req.body.legalNaddressStreetame,
    postalCode: req.body.postalCode,
    town: req.body.town,
    vat: req.body.vat,
    languageUsed: req.body.languageUsed,
  };

  try {
    const didUserRegister = await registerUser(userCredentials);
    console.log("didUserRegister", didUserRegister);
    const shopIdOnMTGI = parseInt(didUserRegister.data.shop.substring(7));

    //register user in our DB too
    await db.User.create({
      idShop: shopIdOnMTGI,
    });
  } catch (error) {
    console.log("error during registering User", error);
    res.status(500).json("An error occured during registering.");
    return;
  }

  res.status(200).json("User has been registered.");
  return;
});

module.exports = router;
