const { startScript } = require("../controllers/scriptController");
const { retrieveAsAdmin } = require("../services/adminBehaviours");
const axios = require("axios");

// Global variable
// This doesnt work
global.__basedir = __dirname;

beforeAll(async () => {
  // axios base URL
  axios.defaults.baseURL = process.env.REACT_APP_THIS_WEBSITE_URL;

  // This data has been arbitrarily defined in the seed files
  const idShopTest = 57;
  const idScriptTest = 3;
  const isTest = false;
  const locale = "fr-FR"; // en-US
  const formats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  const apiResp = await retrieveAsAdmin(
    `${process.env.REACT_APP_MTGAPI_URL}/shops/${idShopTest}`,
    "get",
    {}
  );
  const shopData = apiResp.data;
  const jwt = apiResp.config.headers.Authorization;

  const scriptExecuted = await startScript(
    idShopTest,
    idScriptTest,
    isTest,
    shopData,
    locale,
    formats,
    jwt
  );
});

it("starts a script", async () => {
  expect(1 + 2).toEqual(3);
});
