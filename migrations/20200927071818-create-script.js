"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Scripts", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      isRunning: {
        type: Sequelize.INTEGER,
      },
      willBeBasedOn: {
        type: Sequelize.STRING,
        defaultValue: "mkmTrends",
      },
      keywordBehaviour: {
        type: Sequelize.STRING,
        defaultValue: "ignoresEverything",
      },
      idShop: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "idShop",
        },
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
    await queryInterface.dropTable("Scripts");
  },
};
