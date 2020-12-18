var express = require("express");
var router = express.Router();

router.post("/", async (req, res) => {
  // TODO make it real

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "oneMonthSubscription",
            images: ["https://i.imgur.com/EHyR2nP.png"],
          },
          unit_amount: 49,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.REACT_APP_THIS_WEBSITE_URL}/success`,
    cancel_url: `${process.env.REACT_APP_THIS_WEBSITE_URL}/subscribe`,
  });
  res.json({ id: session.id });

  return;
});

module.exports = router;
