const db = require("../../models/index");
const queryInterface = db.sequelize.getQueryInterface();
const {
  customRules10percentsFoilStandard,
  customRulesPlus10percentsFoilStandard,
  customRules10percentsUPonMKMTrendsStandard,
  customRulesMinus5PercentOnKeywordsCards,
  customRulesMinus5PercentOnModernAbove30euros,
  customRulesPlus5PercentOnModernAbove30euros,
} = require("../services/sampleData/shopCreation");
const {
  premadeScriptTitles,
} = require("../../src/services/fullstackTranslations/genericTranslations");

// Yoann
// WE NEED SHOP BASELANG HERE

// -10% on foil standard
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
// +10% on foil standard
async function createPreMadeScriptsIncrease10PercentsFoilStandard(
  idShop,
  shopLang = "fr-FR"
) {
  const newScript = await db.Script.createCustomScript(
    "+10% Foil Standard for cards > 20 euros", //todo -> traduire le titre en fonction du baselang ID stocké en DB coté API
    idShop,
    "oldPrices"
  );

  // set formats
  newScript.setFormats([12]);

  // Create custom rules for this script
  await queryInterface.bulkInsert(
    "Custom_Rules",
    customRulesPlus10percentsFoilStandard(newScript.dataValues.id),
    {}
  );
}

// +10% on MKM trend for all standard
async function createPreMadeScripts10PercentsUPONMKMALLStandard(
  idShop,
  shopLang = "fr-FR"
) {
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
// -5% sur keyword bien précis
async function createPreMadeScriptsMinus5PercentOnKeywordsCards(
  idShop,
  shopLang = "fr-FR"
) {
  const newScript = await db.Script.createCustomScript(
    "-5% on all the cards with a MKM comment 'Demo Update'", //todo -> traduire le titre en fonction du baselang ID stocké en DB coté API
    idShop,
    "oldPrices",
    "targetsSpecifically"
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
// -5% sur les cartes Modern > 30 euros
async function createPreMadeScriptsMinus5PercentOnModernAbove30euros(
  idShop,
  shopLang = "fr-FR"
) {
  const newScript = await db.Script.createCustomScript(
    "-5% on Modern for cards above 30 euros", //todo -> traduire le titre en fonction du baselang ID stocké en DB coté API
    idShop,
    "oldPrices"
  );

  // set formats
  await newScript.setFormats(4);

  // Create custom rules for this script
  await queryInterface.bulkInsert(
    "Custom_Rules",
    customRulesMinus5PercentOnModernAbove30euros(newScript.dataValues.id),
    {}
  );
}
// +5% sur keyword bien précis
async function createPreMadeScriptsIncrease5PercentOnModernAbove30euros(
  idShop,
  shopLang = "fr-FR"
) {
  const newScript = await db.Script.createCustomScript(
    "+5% on Modern for cards above 30 euros", //todo -> traduire le titre en fonction du baselang ID stocké en DB coté API
    idShop,
    "oldPrices"
  );

  // set formats
  await newScript.setFormats(4);

  // Create custom rules for this script
  await queryInterface.bulkInsert(
    "Custom_Rules",
    customRulesPlus5PercentOnModernAbove30euros(newScript.dataValues.id),
    {}
  );
}

async function createPremadeScriptsForShop(idShop, shopLang = "fr-FR") {
  await createPreMadeScripts10PercentsFoilStandard(
    idShop,
    (shopLang = "fr-FR")
  );
  await createPreMadeScriptsIncrease10PercentsFoilStandard(
    idShop,
    (shopLang = "fr-FR")
  );
  await createPreMadeScripts10PercentsUPONMKMALLStandard(
    idShop,
    (shopLang = "fr-FR")
  );
  await createPreMadeScriptsMinus5PercentOnKeywordsCards(
    idShop,
    (shopLang = "fr-FR")
  );
  await createPreMadeScriptsMinus5PercentOnModernAbove30euros(
    idShop,
    (shopLang = "fr-FR")
  );
  await createPreMadeScriptsIncrease5PercentOnModernAbove30euros(
    idShop,
    (shopLang = "fr-FR")
  );
}

module.exports = {
  createPreMadeScripts10PercentsFoilStandard,
  createPreMadeScriptsIncrease10PercentsFoilStandard,
  createPreMadeScripts10PercentsUPONMKMALLStandard,
  createPreMadeScriptsMinus5PercentOnKeywordsCards,
  createPreMadeScriptsMinus5PercentOnModernAbove30euros,
  createPreMadeScriptsIncrease5PercentOnModernAbove30euros,
  createPremadeScriptsForShop,
};
