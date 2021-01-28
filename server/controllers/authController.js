const { retrieveAsAdmin } = require("../services/adminBehaviours");
const axios = require("axios");
const {
  localeLangIDDictionnary,
} = require("../../src/services/fullstackTranslations/genericTranslations");
const { sendEmail } = require("../controllers/mailController");
const {
  createPremadeScriptsForShop,
} = require("../controllers/shopController");
const { createShopKey } = require("../services/utils");
const db = require("../../models/index");

async function registerOnThisBackEndFromMTGAPI(idShop) {
  // retrieve shop data from MTG API
  const shopData = await retrieveAsAdmin(
    `${process.env.REACT_APP_MTGAPI_URL}/shops/${idShop}`,
    "get"
  );

  // register user in our DB
  const userCreated = await db.User.create({
    idShop: idShop,
    email: shopData.data.email,
    shopKey: shopData.data.shopKey,
  });
}

async function registerUserOnBothBackEnds(
  email,
  password,
  legalName,
  addressStreet,
  postalCode,
  town,
  vat = null,
  languageUsed = "en-US"
) {
  const shopKeyCreated = createShopKey();

  let userCredentials = {
    email,
    password,
    legalName,
    addressStreet,
    postalCode,
    town,
    vat,
    languageUsed,
    shopKey: shopKeyCreated,
  };

  const didUserRegister = await registerUserMTGAPI(userCredentials);
  console.log("didUserRegister", didUserRegister);
  const shopIdOnMTGI = parseInt(didUserRegister.data.shop["@id"].substring(7));

  //register user in our DB too
  const userCreated = await db.User.create({
    idShop: shopIdOnMTGI,
    email: email,
    shopKey: shopKeyCreated,
  });

  // mail user
  sendEmail(
    "register",
    userCreated.dataValues.id,
    email,
    {
      shop: {
        legalName: legalName,
      },
    },
    languageUsed
  );

  // Create premade scripts for user
  await createPremadeScriptsForShop(shopIdOnMTGI, languageUsed);
}

async function registerUserMTGAPI(userCredentials) {
  console.log("log as admin, registerShop on MTGAPI");

  const completeCredentials = buildRegisterObjectForBackEnd(userCredentials);

  return retrieveAsAdmin(
    process.env.REACT_APP_MTGAPI_URL + "/RegisterShop",
    "post",
    completeCredentials
  );
}

function buildRegisterObjectForBackEnd(initialCredentials) {
  const boilerPlateWithMinimalInfos = {
    email: initialCredentials.email,
    pass: initialCredentials.password,
    nickname: "",
    shop: {
      vatNumber: null,
      SIRET: 0,
      tel: "",
      email: initialCredentials.email,
      legalName: initialCredentials.legalName,
      legalClausesBuying: "",
      adress: initialCredentials.addressStreet,
      postalCode: initialCredentials.postalCode,
      town: initialCredentials.town,
      vatNumber: initialCredentials.vat || null,
      baseLang: `/languages/${
        localeLangIDDictionnary[initialCredentials.languageUsed] //BaseLang is deduced from the locale user used in front-end to display language when he registered
      }`,
      appToken: "",
      accessToken: "",
      appSecret: "",
      accessSecret: "",
      shopKey: initialCredentials.shopKey,
      percentPerLangs: [
        {
          percent: 100,
          language: "/languages/1",
        },
        {
          percent: 100,
          language: "/languages/2",
        },
        {
          percent: 100,
          language: "/languages/3",
        },
        {
          percent: 100,
          language: "/languages/4",
        },
        {
          percent: 100,
          language: "/languages/5",
        },
        {
          percent: 100,
          language: "/languages/6",
        },
        {
          percent: 100,
          language: "/languages/7",
        },
        {
          percent: 100,
          language: "/languages/8",
        },
        {
          percent: 100,
          language: "/languages/9",
        },
        {
          percent: 100,
          language: "/languages/10",
        },
        {
          percent: 100,
          language: "/languages/11",
        },
      ],
      percentPerConditions: [
        {
          percent: 100,
          CardCondition: "/card_conditions/1",
        },
        {
          percent: 100,
          CardCondition: "/card_conditions/2",
        },
        {
          percent: 90,
          CardCondition: "/card_conditions/3",
        },
        {
          percent: 80,
          CardCondition: "/card_conditions/4",
        },
        {
          percent: 70,
          CardCondition: "/card_conditions/5",
        },
        {
          percent: 65,
          CardCondition: "/card_conditions/6",
        },
        {
          percent: 60,
          CardCondition: "/card_conditions/7",
        },
      ],
      percentPerConditionFoils: [
        {
          percent: 100,
          CardCondition: "/card_conditions/1",
        },
        {
          percent: 100,
          CardCondition: "/card_conditions/2",
        },
        {
          percent: 90,
          CardCondition: "/card_conditions/3",
        },
        {
          percent: 80,
          CardCondition: "/card_conditions/4",
        },
        {
          percent: 70,
          CardCondition: "/card_conditions/5",
        },
        {
          percent: 65,
          CardCondition: "/card_conditions/6",
        },
        {
          percent: 60,
          CardCondition: "/card_conditions/7",
        },
      ],
      percentPerSigned: 100,
    },
    client: {
      nom: initialCredentials.legalName,
      prenom: initialCredentials.legalName,
      tel: "",
      adress: "",
      postalCode: "",
      town: "",
    },
  };

  return boilerPlateWithMinimalInfos;
}

module.exports = {
  registerUserOnBothBackEnds,
  registerOnThisBackEndFromMTGAPI,
};
