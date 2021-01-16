"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("PUT_Requests", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idShop: {
        type: Sequelize.INTEGER,
      },
      isReal: {
        type: Sequelize.INTEGER,
        validate: { isNumeric: true },
      },
      isRewind: {
        type: Sequelize.INTEGER,
        validate: { isNumeric: true },
      },
      isFinished: {
        type: Sequelize.INTEGER,
        validate: { isNumeric: true },
      },
      had0MKMProducts: {
        type: Sequelize.INTEGER,
        validate: { isNumeric: true },
        defaultValue: 0,
      },
      hasPriceBasedOn: {
        type: Sequelize.STRING,
        defaultValue: "mkmTrends",
      },
      keywordBehaviour: {
        type: Sequelize.STRING,
        defaultValue: "ignoresEverything",
      },
      eventualMKM_ErrorMessage: { type: Sequelize.STRING },
      lastIterationNumberWhenMKM_ErrorHappened: {
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
    await queryInterface.dropTable("PUT_Requests");
  },
};
