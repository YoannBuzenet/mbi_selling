var express = require("express");
var router = express.Router();

const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51HzmkjBMO6DDXsG6Th4l2fguNF6dlh5ciiiKrHv0kJj40U9tF0Fnc8K72zjrzMzUbwoCoQJL6J5sOE1J9X2KeGlA00pzDWvS7Z"
);

router.post("/", async (req, res) => {
  // TODO make it real

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 49,
    currency: "usd",
    // Verify your integration in this guide by including this parameter
    metadata: { integration_check: "accept_a_payment" },
  });

  res.json("stripe building endpoint");

  return;
});

module.exports = router;
