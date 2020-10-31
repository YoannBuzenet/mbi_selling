"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("shop_params", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idShop: {
        type: Sequelize.INTEGER,
      },
      percentPerSigned: {
        type: Sequelize.INTEGER,
      },
      percentPerMintRegular: {
        type: Sequelize.INTEGER,
      },
      percentPerNearMintRegular: {
        type: Sequelize.INTEGER,
      },
      percentPerExcellentRegular: {
        type: Sequelize.INTEGER,
      },
      percentPerGoodRegular: {
        type: Sequelize.INTEGER,
      },
      percentPerLightPlayedRegular: {
        type: Sequelize.INTEGER,
      },
      percentPerPlayedRegular: {
        type: Sequelize.INTEGER,
      },
      percentPerPoorRegular: {
        type: Sequelize.INTEGER,
      },
      percentPerMintFoil: {
        type: Sequelize.INTEGER,
      },
      percentPerNearMintFoil: {
        type: Sequelize.INTEGER,
      },
      percentPerExcellentFoil: {
        type: Sequelize.INTEGER,
      },
      percentPerGoodFoil: {
        type: Sequelize.INTEGER,
      },
      percentPerLightPlayedFoil: {
        type: Sequelize.INTEGER,
      },
      percentPerPlayedFoil: {
        type: Sequelize.INTEGER,
      },
      percentPerPoorFoil: {
        type: Sequelize.INTEGER,
      },
      percentPerLangGerman: {
        type: Sequelize.INTEGER,
      },
      percentPerLangSpanish: {
        type: Sequelize.INTEGER,
      },
      percentPerLangFrench: {
        type: Sequelize.INTEGER,
      },
      percentPerLangItalian: {
        type: Sequelize.INTEGER,
      },
      percentPerLangJapanese: {
        type: Sequelize.INTEGER,
      },
      percentPerLangPortuguese: {
        type: Sequelize.INTEGER,
      },
      percentPerLangRussian: {
        type: Sequelize.INTEGER,
      },
      percentPerLangSimplifiedChinese: {
        type: Sequelize.INTEGER,
      },
      percentPerLangEnglish: {
        type: Sequelize.INTEGER,
      },
      percentPerLangKorean: {
        type: Sequelize.INTEGER,
      },
      percentPerLangTraditionalChinese: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("shop_params");
  },
};
