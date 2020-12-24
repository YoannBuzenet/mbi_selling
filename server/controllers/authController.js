const { retrieveAsAdmin } = require("../services/adminBehaviours");
const axios = require("axios");

async function registerUser(userCredentials) {
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
      vatNumber: initialCredentials.vat || "",
      baseLang: "/languages/3",
      appToken: "",
      accessToken: "",
      appSecret: "",
      accessSecret: "",
      percentPerLangs: [
        {
          percent: 100,
          language: "/languages/3",
        },
      ],
      percentPerConditions: [
        {
          percent: 100,
          CardCondition: "/card_conditions/1",
        },
      ],
      percentPerCondiditonFoils: [
        {
          percent: 100,
          CardCondition: "/card_conditions/1",
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
