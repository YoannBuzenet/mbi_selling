const { retrieveAsAdmin } = require("../services/adminBehaviours");
const axios = require("axios");

async function registerUser(userCredentials) {
  console.log("log as admin, registerShop on MTGAPI");

  //Definir la langue ici
  // Besoin de dictionnaire et de dictionnaire inversé pour avoir le lang ID stocké en DB MTGAPI
  // yoann

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
      vatNumber: initialCredentials.vat || "",
      baseLang: "/languages/3",
      appToken: "",
      accessToken: "",
      appSecret: "",
      accessSecret: "",
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
      nom: "mbi_selling",
      prenom: "mbi_selling",
      tel: "",
      adress: "",
      postalCode: "",
      town: "",
    },
  };

  return boilerPlateWithMinimalInfos;
}

module.exports = { registerUser };
