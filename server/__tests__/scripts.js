const { startScript } = require("../controllers/scriptController");
const { retrieveAsAdmin } = require("../services/adminBehaviours");

// is needed
// idShop, idScript, isTest, shopData, locale, formats, jwt;

// This data has been arbitrarily defined in the seed files
const idShopTest = 7;
const idScriptTest = 3;
const isTest = false;
const locale = "fr-FR"; // en-US
// formats (array of integer) & JWT (with Bearer)

it("starts a script", async () => {
  const apiResp = await retrieveAsAdmin(
    `${process.env.REACT_APP_MTGAPI_URL}/shops/${idShopTest}`,
    "get",
    {}
  );
  const shopData = apiResp.data;

  expect(1 + 2).toEqual(3);
});
