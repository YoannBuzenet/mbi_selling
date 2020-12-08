var express = require("express");
var router = express.Router();
var axios = require("axios");
const db = require("../../../models/index");
const { registerUser } = require("../../controllers/authController");

router.post("/", async (req, res) => {
  //Checking payload
  if (req.body.email === undefined || req.body.password === undefined) {
    res.status(406).json("Parameters are missing to register User.");
    return;
  }

  console.log("get data from front");
  let userCredentials = { email: req.body.email, password: req.body.password };

  // stuff here
  await registerUser(userCredentials);

  console.log("send 200 back");

  res.status(200).json("User has been registered.");
  return;
});

module.exports = router;
