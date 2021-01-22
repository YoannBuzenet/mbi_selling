"use strict";
require("dotenv").config();
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idShop: {
        type: Sequelize.INTEGER,
        unique: true,
      },
      shopKey: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      isSubscribedUntil: {
        type: Sequelize.DATEONLY,
      },
      temporarySecret: {
        type: Sequelize.STRING,
      },
      temporaryLastProductPaid: {
        type: Sequelize.STRING,
      },
      shouldHaveStockDataRefreshed: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
    await queryInterface.dropTable("Users");
  },
};
