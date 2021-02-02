"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const db = require("../models/index");

    return await db.shop_params.bulkCreate(
      [
        {
          idShop: 57,
          percentPerSigned: 100,
          percentPerMintRegular: 100,
          percentPerNearMintRegular: 100,
          percentPerExcellentRegular: 90,
          percentPerGoodRegular: 80,
          percentPerLightPlayedRegular: 70,
          percentPerPlayedRegular: 60,
          percentPerPoorRegular: 50,
          percentPerMintFoil: 100,
          percentPerNearMintFoil: 100,
          percentPerExcellentFoil: 90,
          percentPerGoodFoil: 80,
          percentPerLightPlayedFoil: 70,
          percentPerPlayedFoil: 60,
          percentPerPoorFoil: 60,
          percentPerLangGerman: 98,
          percentPerLangSpanish: 95,
          percentPerLangFrench: 97,
          percentPerLangItalian: 101,
          percentPerLangJapanese: 102,
          percentPerLangPortuguese: 75,
          percentPerLangRussian: 55,
          percentPerLangSimplifiedChinese: 77,
          percentPerLangEnglish: 88,
          percentPerLangKorean: 99,
          percentPerLangTraditionalChinese: 33,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("MkmProducts", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
