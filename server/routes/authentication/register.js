var express = require("express");
var router = express.Router();
const {
  registerUserOnBothBackEnds,
} = require("../../controllers/authController");
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

  try {
    await registerUserOnBothBackEnds(
      req.body.email,
      req.body.password,
      req.body.legalName,
      req.body.addressStreet,
      req.body.postalCode,
      req.body.town,
      req.body.vat || null,
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
