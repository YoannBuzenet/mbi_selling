var express = require("express");
var router = express.Router();
const db = require("../../../models/index");
const Sequelize = require("sequelize");
const PDFGeneration = require("../../services/PDFGeneration");
const Op = Sequelize.Op;

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

router.get("/GetAllMKMProductsForShop", async (req, res) => {
  const chunkOfCards = await db.MkmProduct.findAll(
    {
      include: [
        {
          model: db.productLegalities,
          where: {
            [Op.or]: [{ isLegalLegacy: 1 }, { isLegalCommander: 1 }],
          },
        },
      ],
      where: {
        idShop: 7,
      },
    },
    {}
  );

  res.json(chunkOfCards);
});

router.post("/GetCardsWithFormatPayload", async (req, res) => {
  //isLegal via l'association productLegality
  const Op = Sequelize.Op;
  const numberOfCardsToHandle = await db.MkmProduct.findAll({
    include: [
      {
        model: db.productLegalities,
        where: {
          [Op.or]: {
            isLegalCommander: 1,
            isLegalLegacy: 1,
          },
        },
      },
    ],
    where: {
      idShop: 4,
    },
  });
});

router.get("/generatePDFTest", async (req, res) => {
  await PDFGeneration.generatePDFFromPutRequest(8);

  res.status(200).json("PDF créé !");
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
