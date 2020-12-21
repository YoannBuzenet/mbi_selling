var express = require("express");
var router = express.Router();
const { calculateAmount } = require("../../controllers/paymentController");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET);
const db = require("../../../models/index");
const {
  getProductDurationWithProductName,
} = require("../../../src/services/productAPI");

const {
  getRelevantDateForUpdateSubscribe,
  addMonthsToADate,
} = require("../../services/utils");

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

  const amountToPay = calculateAmount(req.body.productData);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountToPay, // Amount is in cents
    currency: "usd",
    // Verify your integration in this guide by including this parameter
    metadata: { integration_check: "accept_a_payment" },
  });

  // Storing Secret in DB to be able to track this payment
  const updatedUSer = await db.User.upsert({
    idShop: idShop,
    temporarySecret: paymentIntent.client_secret,
    temporaryLastProductPaid: req.body.productData,
    updatedAt: Date.now(),
  });

  // TODO create invoice

  res.json({ client_secret: paymentIntent.client_secret });

  return;
});

router.post("/subscribe", async (req, res) => {
  /* ************************** */
  /* ****SECURITY & CHECKS**** */
  /* ************************ */

  let clientSecret = req.body.token;
  let idShop = req.body.idShop;

  if (clientSecret === undefined) {
    res.status(406).json("Parameter token is missing in payload.");
    return;
  }

  if (idShop === undefined) {
    res.status(406).json("Parameter idShop is missing in payload.");
    return;
  }

  // go in DB, compare with secret stored
  const user = await db.User.findOne({
    where: {
      idShop: idShop,
    },
  });

  if (user === null) {
    res.status(406).json("User doesn't exist.");
    return;
  }

  const secretFromDB = user.dataValues.temporarySecret;

  if (secretFromDB === null) {
    res.status(406).json("No secret stored in DB.");
    return;
  }

  const lastProductBought = user.dataValues.temporaryLastProductPaid;

  // if secret from DB matches with the one received : go + delete
  if (
    clientSecret === secretFromDB &&
    secretFromDB !== null &&
    secretFromDB !== ""
  ) {
    // Duration definition
    const subscribeDurationInMonth = getProductDurationWithProductName(
      lastProductBought
    );

    // Getting the right date
    const date = getRelevantDateForUpdateSubscribe(
      user.dataValues.isSubscribedUntil
    );

    // Adding duration on that date
    const dateWithSubscriptionAdded = addMonthsToADate(
      date,
      subscribeDurationInMonth
    );

    // Save it in DB & erase temporary secret & temporary product
    const updatedSubscription = await db.User.upsert({
      idShop: idShop,
      isSubscribedUntil: dateWithSubscriptionAdded,
      temporarySecret: null,
      temporaryLastProductPaid: null,
    });

    res.json("User Subscription Updated").status(200);
  } else {
    res.status(406).json("Secrets do not match.");
    return;
  }
});

module.exports = router;
