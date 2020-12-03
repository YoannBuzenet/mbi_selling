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
      isFinished: {
        type: Sequelize.INTEGER,
        validate: { isNumeric: true },
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
