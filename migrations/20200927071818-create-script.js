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
        type: Sequelize.STRING,
      },
      isRunning: {
        type: Sequelize.INTEGER,
      },
      willBeBasedOn: {
        type: Sequelize.STRING,
        defaultValue: "mkmTrends",
      },
      idShop: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
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
