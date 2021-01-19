const db = require("../../models/index");
const queryInterface = db.sequelize.getQueryInterface();
const {
  customRules10percentsFoilStandard,
} = require("../services/sampleData/shopCreation");

console.log("query interfaaace", queryInterface);

async function createPreMadeScripts10PercentsFoilStandard(idShop) {
  //-10% standard Foil
  const newScript = await db.Script.createCustomScript(
    "-10% Foil Standard",
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

module.exports = {
  createPreMadeScripts10PercentsFoilStandard,
};
