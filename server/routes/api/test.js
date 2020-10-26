var express = require("express");
var router = express.Router();
const db = require("../../../models/index");

router.get("/", async (req, res) => {
  //Old test to try many to many relations
  const jwt = req.headers.authorization;

  console.log(db.Script);

  const script = await db.Script.findOne({
    where: {
      id: 1,
    },
  });

  const complete_data = await script.getFormats();

  console.log(complete_data);

  script.setFormats([2, 3]);

  res.json(script);
});
router.get("/GetTransformedArrayOfAllFormats", async (req, res) => {
  const allFormats = await db.Format.findAll();
  const reducer = (accumulator, currentValue) => [
    ...accumulator,
    currentValue.id,
  ];
  const arrayOfFormatId = allFormats.reduce(reducer, []);
  console.log(arrayOfFormatId);

  res.json(arrayOfFormatId);
});

router.post("/createOneCardInStock", async (req, res) => {
  const oneCard = await db.MkmProduct.create({
    idArticle: 3,
    idProduct: 2,
    englishName: "ok",
    localName: "ok",
    Exp: 5,
    expName: "ok",
    price: 5,
    language: 6,
    condition: 7,
    isFoil: 0,
    isSigned: 0,
    isPlayset: 0,
    isAltered: 0,
    comments: 0,
    amount: 10,
    onSale: 0,
    idCurrency: 1,
    currencyCode: "EUR",
    idShop: 4,
  });

  res.status(200).json(oneCard);
});

module.exports = router;
