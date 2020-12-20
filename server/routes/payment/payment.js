var express = require("express");
var router = express.Router();
const { calculateAmount } = require("../../controllers/paymentController");
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET);
const securityCheckAPI = require("../../services/securityCheckAPI");

// sending the secret to the client to enables him to ping Stripe directly

router.post("/", async (req, res) => {
  /* ************************** */
  /* ****SECURITY & CHECKS**** */
  /* ************************ */
  securityCheckAPI.checkQueryParams(req, res, ["productData"]);

  /* should we check JWT ? */

  /* ************************** */
  /* ********** LOGIC ********* */
  /* ************************** */

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateAmount(req.body.productData), // Amount is in cents
    currency: "usd",
    // Verify your integration in this guide by including this parameter
    metadata: { integration_check: "accept_a_payment" },
  });

  res.json({ client_secret: paymentIntent.client_secret });

  return;
});

module.exports = router;
