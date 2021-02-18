const db = require("../../models/index");
const queryInterface = db.sequelize.getQueryInterface();
const {
  customRulesPlus10percentsBeyondToDeathBetween50centsAnd20euros,
  customRulesDecrease10PercentsBTD,
  customRules10percentsUPonMKMTrendsStandard,
  customRulesMinus5PercentOnKeywordsCards,
  customRulesMinus5PercentOnModernAbove30euros,
  customRulesPlus5PercentOnModernAbove30euros,
  create4RaritiesForScript,
} = require("../services/sampleData/shopCreation");
const {
  premadeScriptTitles,
} = require("../../src/services/fullstackTranslations/genericTranslations");

async function createPreMadeScripts10PercentsAboveTrendsBTD(
  idShop,
  shopLang = "fr-FR"
) {
  const newScript = await db.Script.createCustomScript(
    premadeScriptTitles
      .customRulesPlus10percentsBeyondToDeathBetween50centsAnd20euros[shopLang],
    idShop,
    "mkmTrends"
  );

  await db.Expansion.create({
    name: "Theros Beyond Death",
    idScript: newScript.dataValues.id,
  });

  // Create custom rules for this script
  await queryInterface.bulkInsert(
    "Custom_Rules",
    customRulesPlus10percentsBeyondToDeathBetween50centsAnd20euros(
      newScript.dataValues.id
    ),
    {}
  );

  await queryInterface.bulkInsert(
    "rarities",
    create4RaritiesForScript(newScript.dataValues.id),
    {}
  );
}

async function createPreMadeScriptsDecrease10PercentsOnBTD(
  idShop,
  shopLang = "fr-FR"
) {
  const newScript = await db.Script.createCustomScript(
    premadeScriptTitles.customRulesDecrease10PercentsOnBTD[shopLang],
    idShop,
    "oldPrices"
  );

  // Create custom rules for this script
  await queryInterface.bulkInsert(
    "Custom_Rules",
    customRulesDecrease10PercentsBTD(newScript.dataValues.id),
    {}
  );

  await db.Expansion.create({
    name: "Theros Beyond Death",
    idScript: newScript.dataValues.id,
  });

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
  await createPreMadeScripts10PercentsAboveTrendsBTD(idShop, shopLang);
  await createPreMadeScriptsDecrease10PercentsOnBTD(idShop, shopLang);
  await createPreMadeScripts10PercentsUPONMKMALLStandard(idShop, shopLang);
  await createPreMadeScriptsMinus5PercentOnKeywordsCards(idShop, shopLang);
  await createPreMadeScriptsMinus5PercentOnModernAbove30euros(idShop, shopLang);
  await createPreMadeScriptsIncrease5PercentOnModernAbove30euros(
    idShop,
    shopLang
  );
}

module.exports = {
  createPreMadeScripts10PercentsAboveTrendsBTD,
  createPreMadeScriptsDecrease10PercentsOnBTD,
  createPreMadeScripts10PercentsUPONMKMALLStandard,
  createPreMadeScriptsMinus5PercentOnKeywordsCards,
  createPreMadeScriptsMinus5PercentOnModernAbove30euros,
  createPreMadeScriptsIncrease5PercentOnModernAbove30euros,
  createPremadeScriptsForShop,
};
