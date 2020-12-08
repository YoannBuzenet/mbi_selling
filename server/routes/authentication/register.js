var express = require("express");
var router = express.Router();
const { registerUser } = require("../../controllers/authController");

router.post("/", async (req, res) => {
  //Checking payload
  if (req.body.email === undefined || req.body.password === undefined) {
    res.status(406).json("Parameters are missing to register User.");
    return;
  }

  console.log("get data from front");
  let userCredentials = { email: req.body.email, password: req.body.password };

  try {
    const didUserRegister = await registerUser(userCredentials);
    console.log("didUserRegister", didUserRegister);
  } catch (error) {
    console.log("error during registering User", error);
    res.status(500).json("An error occured during registering.");
    return;
  }

  res.status(200).json("User has been registered.");
  return;
});

module.exports = router;
