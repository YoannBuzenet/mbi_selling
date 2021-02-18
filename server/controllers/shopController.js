const db = require("../../models/index");
const queryInterface = db.sequelize.getQueryInterface();
const {
  customRules10percentsFoilStandard,
  customRulesPlus10percentsFoilStandard,
  customRules10percentsUPonMKMTrendsStandard,
  customRulesMinus5PercentOnKeywordsCards,
  customRulesMinus5PercentOnModernAbove30euros,
  customRulesPlus5PercentOnModernAbove30euros,
  create4RaritiesForScript,
} = require("../services/sampleData/shopCreation");
const {
  premadeScriptTitles,
} = require("../../src/services/fullstackTranslations/genericTranslations");

// -10% on foil standard
async function createPreMadeScripts10PercentsFoilStandard(
  idShop,
  shopLang = "fr-FR"
) {
  //-10% standard Foil
  const newScript = await db.Script.createCustomScript(
    premadeScriptTitles.createPreMadeScripts10PercentsFoilStandard[shopLang],
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

  await queryInterface.bulkInsert(
    "rarities",
    create4RaritiesForScript(newScript.dataValues.id),
    {}
  );
}
// +10% on foil standard
async function createPreMadeScriptsIncrease10PercentsFoilStandard(
  idShop,
  shopLang = "fr-FR"
) {
  const newScript = await db.Script.createCustomScript(
    premadeScriptTitles.createPreMadeScriptsIncrease10PercentsFoilStandard[
      shopLang
    ],
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

  await queryInterface.bulkInsert(
    "rarities",
    create4RaritiesForScript(newScript.dataValues.id),
    {}
  );
}

// +10% on MKM trend for all standard
async function createPreMadeScripts10PercentsUPONMKMALLStandard(
  idShop,
  shopLang = "fr-FR"
) {
  const newScript = await db.Script.createCustomScript(
    premadeScriptTitles.createPreMadeScripts10PercentsUPONMKMALLStandard[
      shopLang
    ],
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

  await queryInterface.bulkInsert(
    "rarities",
    create4RaritiesForScript(newScript.dataValues.id),
    {}
  );
}
// -5% sur keyword bien précis
async function createPreMadeScriptsMinus5PercentOnKeywordsCards(
  idShop,
  shopLang = "fr-FR"
) {
  const newScript = await db.Script.createCustomScript(
    premadeScriptTitles.createPreMadeScriptsMinus5PercentOnKeywordsCards[
      shopLang
    ],
    idShop,
    "oldPrices",
    "targetsSpecifically"
  );

  // set formats
  await newScript.setFormats([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);

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

  await queryInterface.bulkInsert(
    "rarities",
    create4RaritiesForScript(newScript.dataValues.id),
    {}
  );
}
// -5% sur les cartes Modern > 30 euros
async function createPreMadeScriptsMinus5PercentOnModernAbove30euros(
  idShop,
  shopLang = "fr-FR"
) {
  const newScript = await db.Script.createCustomScript(
    premadeScriptTitles.createPreMadeScriptsMinus5PercentOnModernAbove30euros[
      shopLang
    ],
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

  await queryInterface.bulkInsert(
    "rarities",
    create4RaritiesForScript(newScript.dataValues.id),
    {}
  );
}
// +5% sur keyword bien précis
async function createPreMadeScriptsIncrease5PercentOnModernAbove30euros(
  idShop,
  shopLang = "fr-FR"
) {
  const newScript = await db.Script.createCustomScript(
    premadeScriptTitles
      .createPreMadeScriptsIncrease5PercentOnModernAbove30euros[shopLang],
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

  await queryInterface.bulkInsert(
    "rarities",
    create4RaritiesForScript(newScript.dataValues.id),
    {}
  );
}

async function createPremadeScriptsForShop(idShop, shopLang = "fr-FR") {
  await createPreMadeScripts10PercentsFoilStandard(idShop, shopLang);
  await createPreMadeScriptsIncrease10PercentsFoilStandard(idShop, shopLang);
  await createPreMadeScripts10PercentsUPONMKMALLStandard(idShop, shopLang);
  await createPreMadeScriptsMinus5PercentOnKeywordsCards(idShop, shopLang);
  await createPreMadeScriptsMinus5PercentOnModernAbove30euros(idShop, shopLang);
  await createPreMadeScriptsIncrease5PercentOnModernAbove30euros(
    idShop,
    shopLang
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
