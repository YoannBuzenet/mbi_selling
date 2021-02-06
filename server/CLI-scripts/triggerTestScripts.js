const { startScript } = require("../controllers/scriptController");
const { retrieveAsAdmin } = require("../services/adminBehaviours");
const axios = require("axios");

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
  const formats = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  const apiResp = await retrieveAsAdmin(
    `${process.env.REACT_APP_MTGAPI_URL}/shops/${idShopTest}`,
    "get",
    {}
  );
  const shopData = apiResp.data;
  const jwt = apiResp.config.headers.Authorization;

  // const scriptExecuted = await startScript(
  //   idShopTest,
  //   idScriptTest,
  //   isTest,
  //   shopData,
  //   locale,
  //   formats,
  //   jwt
  // );

  // const scriptTestExecuted = await startScript(
  //   idShopTest,
  //   idScriptTest,
  //   true,
  //   shopData,
  //   locale,
  //   formats,
  //   jwt
  // );

  const scriptRealOldPriceExecuted = await startScript(
    idShopTest,
    4,
    true,
    shopData,
    locale,
    formats,
    jwt
  );
}

triggerTestScripts();
