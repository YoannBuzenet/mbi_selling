const { startScript } = require("../controllers/scriptController");
const { retrieveAsAdmin } = require("../services/adminBehaviours");
const axios = require("axios");
const path = require("path");
const result = require("dotenv").config({
  path: path.resolve(process.cwd(), "./.env.local"),
});
if (result.error) {
  console.log(process.cwd());
  throw result.error;
}

// Global variable
// This doesnt work : we need to pass the root of the app in this variable
// However, it is not important : it just allows to find the right mail template. Without that, mail arrive empty, just with the PDF.
global.__basedir = __dirname;

async function triggerTestScripts() {
  // axios base URL
  axios.defaults.baseURL = process.env.REACT_APP_THIS_WEBSITE_URL;

  // This data has been arbitrarily defined in the seed files
  const idShopTest = 57;
  const idScriptTest = 3;
  const isTest = false;
  const locale = "fr-FR"; // en-US
  // const formats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  const formats = [];
  const formatsForTesting = [9, 11];

  const apiResp = await retrieveAsAdmin(
    `${process.env.REACT_APP_MTGAPI_URL}/shops/${idShopTest}`,
    "get",
    {}
  );
  const shopData = apiResp.data;
  const jwt = apiResp.config.headers.Authorization;

  // Mkm Trends - Real
  const scriptExecuted = await startScript(
    idShopTest,
    idScriptTest,
    isTest,
    shopData,
    locale,
    formats,
    jwt
  );

  // Mkm Trends - test
  const scriptTestExecuted = await startScript(
    idShopTest,
    idScriptTest,
    true,
    shopData,
    locale,
    formats,
    jwt
  );

  // Old Price - test
  const scriptTestOldPriceExecuted = await startScript(
    idShopTest,
    4,
    true,
    shopData,
    locale,
    formats,
    jwt
  );

  // Old Price - Real
  const scriptRealOldPriceExecuted = await startScript(
    idShopTest,
    4,
    false,
    shopData,
    locale,
    formats,
    jwt
  );

  // Script Targets Keywords
  const scriptRealOldPriceTargetsKeywordsExecuted = await startScript(
    idShopTest,
    5,
    false,
    shopData,
    locale,
    formats,
    jwt
  );

  // Script Avoids Keywords
  const scriptRealOldPriceAvoidsKeywordsExecuted = await startScript(
    idShopTest,
    6,
    false,
    shopData,
    locale,
    formats,
    jwt
  );

  // Script with rarities
  const scriptRealOldPriceMissingRaritiesExecuted = await startScript(
    idShopTest,
    7,
    false,
    shopData,
    locale,
    formats,
    jwt
  );

  // Script with rarities
  const scriptRealOldPriceMissingRaritiesOnlyrareExecuted = await startScript(
    idShopTest,
    8,
    true,
    shopData,
    locale,
    formats,
    jwt
  );

  // Script with expansion filter
  const scriptRealOldPriceExpansionFilterExecuted = await startScript(
    idShopTest,
    9,
    false,
    shopData,
    locale,
    formats,
    jwt
  );

  // Script with expansion AND rarities combined
  const scriptRealOldPriceExpansionAndRarityFilterExecuted = await startScript(
    idShopTest,
    10,
    true,
    shopData,
    locale,
    formats,
    jwt
  );

  // Script with format filter
  const scriptRealOldPriceFormatFilterExecuted = await startScript(
    idShopTest,
    11,
    true,
    shopData,
    locale,
    formatsForTesting,
    jwt
  );

  // Script with format filter + rarity filter + expansion filter + keywords
  const scriptRealOldPriceALLFiltersExecuted = await startScript(
    idShopTest,
    12,
    true,
    shopData,
    locale,
    formatsForTesting,
    jwt
  );
}

triggerTestScripts();
