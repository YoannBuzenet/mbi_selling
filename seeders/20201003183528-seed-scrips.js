"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const db = require("../models/index");
    await db.Script.bulkCreate([
      {
        idShop: 4,
        name: "Le premier script",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idShop: 4,
        name: "Le second script",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idShop: 57,
        name: "Le troisième script",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idShop: 57,
        name: "Fourth Script to test oldPrice discount",
        willBeBasedOn: "oldPrices",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idShop: 57,
        name: "Fifth Script to test Targeting Keyworkds",
        willBeBasedOn: "oldPrices",
        keywordBehaviour: "targetsSpecifically",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idShop: 57,
        name: "Sixth Script to test Avoiding Keyworkds",
        willBeBasedOn: "oldPrices",
        keywordBehaviour: "avoidsSpecifically",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idShop: 57,
        name: "7th script to test rarities on common/mythic",
        willBeBasedOn: "oldPrices",
        keywordBehaviour: "avoidsSpecifically",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idShop: 57,
        name: "8th script to test rarities on rare only",
        willBeBasedOn: "oldPrices",
        keywordBehaviour: "avoidsSpecifically",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idShop: 57,
        name: "9th script to test expansions filter",
        willBeBasedOn: "oldPrices",
        keywordBehaviour: "avoidsSpecifically",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idShop: 57,
        name: "10th script to test expansions filter AND rarity combined",
        willBeBasedOn: "oldPrices",
        keywordBehaviour: "avoidsSpecifically",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idShop: 57,
        name: "11th script to test format filter",
        willBeBasedOn: "oldPrices",
        keywordBehaviour: "avoidsSpecifically",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idShop: 57,
        name:
          "12th script to test format filter + rarity filter + expansion filter",
        willBeBasedOn: "oldPrices",
        keywordBehaviour: "avoidsSpecifically",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idShop: 57,
        name:
          "13th script testing if script can be launched with no rules in one of the two categories",
        willBeBasedOn: "oldPrices",
        keywordBehaviour: "avoidsSpecifically",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Trying to add a N to N data to script 3
    // const script3 = await db.Script.findOne({
    //   where: {
    //     id: 3,
    //   },
    // });

    // return script3.setFormats([1, 4]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Scripts", null, {});
  },
};
