"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("productLegalities", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idProduct: {
        type: Sequelize.INTEGER,
        unique: true,
      },
      idSet: {
        type: Sequelize.INTEGER,
      },
      isLegalCommander: {
        type: Sequelize.INTEGER,
      },
      isLegalDuel: {
        type: Sequelize.INTEGER,
      },
      isLegalLegacy: {
        type: Sequelize.INTEGER,
      },
      isLegalModern: {
        type: Sequelize.INTEGER,
      },
      isLegalVintage: {
        type: Sequelize.INTEGER,
      },
      isLegalPenny: {
        type: Sequelize.INTEGER,
      },
      isLegalPauper: {
        type: Sequelize.INTEGER,
      },
      isLegalHistoric: {
        type: Sequelize.INTEGER,
      },
      isLegalPioneer: {
        type: Sequelize.INTEGER,
      },
      isLegalBrawl: {
        type: Sequelize.INTEGER,
      },
      isLegalFuture: {
        type: Sequelize.INTEGER,
      },
      isLegalStandard: {
        type: Sequelize.INTEGER,
      },
      isLegalOldSchool: {
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
    await queryInterface.dropTable("productLegalities");
  },
};
