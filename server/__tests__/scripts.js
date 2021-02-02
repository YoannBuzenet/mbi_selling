const { startScript } = require("../controllers/scriptController");

// is needed
// idShop, idScript, isTest, shopData, locale, formats, jwt;

// This data has been arbitrarily defined in the seed files
const idShopTest = 7;
const idScriptTest = 3;
const isTest = false;
//shopData ?

it("starts a script", () => {
  console.log("ouah :O", startScript);
  console.log("env is : " + process.env.NODE_ENV);
  expect(1 + 2).toEqual(3);
});
