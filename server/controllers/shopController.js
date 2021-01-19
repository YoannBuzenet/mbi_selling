const db = require("../../models/index");
const queryInterface = db.sequelize.getQueryInterface();
const {
  customRules10percentsFoilStandard,
  customRules10percentsUPonMKMTrendsStandard,
  customRulesMinus5PercentOnKeywordsCards,
} = require("../services/sampleData/shopCreation");

async function createPreMadeScripts10PercentsFoilStandard(
  idShop,
  shopLang = "fr-FR"
) {
  //-10% standard Foil
  const newScript = await db.Script.createCustomScript(
    "-10% Foil Standard for cards > 20 euros", //todo -> traduire le titre en fonction du baselang ID stocké en DB coté API
    idShop,
    "oldPrices"
  );

  // set formats
  newScript.setFormats([12]);

  // Create custom rules for this script
  await queryInterface.bulkInsert(
    "Custom_Rules",
    customRules10percentsFoilStandard(newScript.dataValues.id),
    {}
  );
}

async function createPreMadeScripts10PercentsUPONMKMALLStandard(
  idShop,
  shopLang = "fr-FR"
) {
  //-10% standard Foil
  const newScript = await db.Script.createCustomScript(
    "10% higher than MKM Trend on all standard and nothing under 50 cents", //todo -> traduire le titre en fonction du baselang ID stocké en DB coté API
    idShop,
    "mkmTrends"
  );

  // set formats
  newScript.setFormats([12]);

  // Create custom rules for this script
  await queryInterface.bulkInsert(
    "Custom_Rules",
    customRules10percentsUPonMKMTrendsStandard(newScript.dataValues.id),
    {}
  );
}

async function createPreMadeScriptsMinus5PercentOnKeywordsCards(
  idShop,
  shopLang = "fr-FR"
) {
  //-10% standard Foil
  const newScript = await db.Script.createCustomScript(
    "-5% on all the cards with a MKM comment 'Demo Update'", //todo -> traduire le titre en fonction du baselang ID stocké en DB coté API
    idShop,
    "oldPrices"
  );

  // set formats
  await newScript.setFormats([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

  // Create keywords
  await db.Keyword.create({
    name: "Demo Update",
    idScript: newScript.dataValues.id,
  });

  // Create custom rules for this script
  await queryInterface.bulkInsert(
    "Custom_Rules",
    customRulesMinus5PercentOnKeywordsCards(newScript.dataValues.id),
    {}
  );
}

module.exports = {
  createPreMadeScripts10PercentsFoilStandard,
  createPreMadeScripts10PercentsUPONMKMALLStandard,
  createPreMadeScriptsMinus5PercentOnKeywordsCards,
};
