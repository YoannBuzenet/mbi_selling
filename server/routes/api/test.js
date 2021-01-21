var express = require("express");
var router = express.Router();
const db = require("../../../models/index");
const Sequelize = require("sequelize");
const PDFGeneration = require("../../services/PDFGeneration");
const Op = Sequelize.Op;
const { sendEmail } = require("../../controllers/mailController");
const utils = require("../../services/utils");
const {
  createPreMadeScripts10PercentsFoilStandard,
  createPreMadeScriptsMinus5PercentOnKeywordsCards,
} = require("../../controllers/shopController");

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
  await PDFGeneration.generatePDFFromPutRequest(1);

  res.status(200).json("PDF créé !");
});

router.get("/testkeywords", async (req, res) => {
  const keywords = await db.Keyword.findOne({
    where: {
      idScript: 3,
    },
  });

  res.status(200).json(keywords);
});

router.get("/testDBFilterWithKeywords", async (req, res) => {
  const MkmProducts = await db.MkmProduct.findAll({
    where: {
      idShop: "7",
      comments: { [Op.not]: ["+20cc"] },
    },
  });

  res.status(200).json(MkmProducts);
  return;
});

router.get(
  "/createPremadeScriptFoil10PercentsFoilStandard",
  async (req, res) => {
    await createPreMadeScripts10PercentsFoilStandard(7);
    await createPreMadeScriptsMinus5PercentOnKeywordsCards(7);
    res.status(200).json("bro");
    return;
  }
);

router.get("/addJobToQueue", async (req, res) => {
  console.log("received the request to add to queue");
  // Yo
  var Queue = require("bull");
  var videoQueue = new Queue("Test bro", "redis://127.0.0.1:6379");

  // console.log("our queue object : ", videoQueue);

  videoQueue.process(async function (job, done) {
    console.log("getting the process started");
    // console.log("the job :", job);
    await utils.sleep(5000);
    console.log("Processed 5secs");
  });
  videoQueue.add({ video: "http://example.com/video1.mov" });
  res.status(200).json("Job added to Queue !");
});

router.get("/tryModelMethod", async (req, res) => {
  const mock_card = {
    idProduct: 1,
    idArticle: 2,
    cardName: "test erreur MKM",
    oldPrice: 1,
    newPrice: 2,
    condition: 7,
    lang: 5,
    isFoil: 0,
    isSigned: 0,
    amount: 1,
  };

  await db.put_memory.registerAsFailure(3, mock_card, 1, 1);

  res.status(200).json("Put memory d'erreur crée depuis le model :O");
});

router.get("/checkScriptUser", async (req, res) => {
  const script = await db.Script.findOne({
    where: {
      idShop: 7,
    },
    include: [
      {
        model: db.User,
      },
    ],
  });

  console.log("script in test route", script);

  const userScripts = script.getUser();

  res.status(200).json(userScripts);
});

router.get("/mailSendingTest", async (req, res) => {
  // sendEmail(3, 7, "ybuzenet@gmail.com", true);

  res.status(200).json("endpoint Mail à corriger");
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
