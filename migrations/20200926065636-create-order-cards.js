"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("OrderCards", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.INTEGER,
      },
      condition: {
        type: Sequelize.STRING,
      },
      lang: {
        type: Sequelize.INTEGER,
      },
      isFoil: {
        type: Sequelize.INTEGER,
      },
      isSigned: {
        type: Sequelize.INTEGER,
      },
      isAltered: {
        type: Sequelize.INTEGER,
      },
      isPlayset: {
        type: Sequelize.INTEGER,
      },
      isOrder: {
        type: Sequelize.INTEGER,
      },
      isProduct: {
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
    await queryInterface.dropTable("OrderCards");
  },
};
