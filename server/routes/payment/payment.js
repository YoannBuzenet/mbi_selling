var express = require("express");
var router = express.Router();
const { calculateAmount } = require("../../controllers/paymentController");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET);
const db = require("../../../models/index");

// sending the secret to the client to enables him to ping Stripe directly

router.post("/", async (req, res) => {
  /* ************************** */
  /* ****SECURITY & CHECKS**** */
  /* ************************ */

  let productData = req.body.productData;
  let idShop = req.body.idShop;

  if (productData === undefined) {
    res.status(406).json("Parameter productData is missing in payload.");
    return;
  }

  if (idShop === undefined) {
    res.status(406).json("Parameter idShop is missing in payload.");
    return;
  }

  /* ************************** */
  /* ********** LOGIC ********* */
  /* ************************** */

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateAmount(req.body.productData), // Amount is in cents
    currency: "usd",
    // Verify your integration in this guide by including this parameter
    metadata: { integration_check: "accept_a_payment" },
  });

  console.log("req.body.productData", req.body.productData);

  // Storing Secret in DB to be able to track this payment
  const updatedUSer = await db.User.upsert({
    idShop: idShop,
    temporarySecret: paymentIntent.client_secret,
    temporaryLastProductPaid: req.body.productData,
    updatedAt: Date.now(),
  });

  res.json({ client_secret: paymentIntent.client_secret });

  return;
});

// TO BUILD MY DEAR
router.post("/subscribe", async (req, res) => {
  // check payload : secret & idShop
  // go in DB, compare with secret stored
  // if OK : go + delete
  //if not ok : do nothing
});

module.exports = router;
