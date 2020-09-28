"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("priceguides", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idProduct: {
        type: Sequelize.INTEGER,
      },
      avgSellPrice: {
        type: Sequelize.INTEGER,
      },
      lowPrice: {
        type: Sequelize.INTEGER,
      },
      trendPrice: {
        type: Sequelize.INTEGER,
      },
      germanProLow: {
        type: Sequelize.INTEGER,
      },
      suggestedPrice: {
        type: Sequelize.INTEGER,
      },
      foilSell: {
        type: Sequelize.INTEGER,
      },
      foilLow: {
        type: Sequelize.INTEGER,
      },
      foilTrend: {
        type: Sequelize.INTEGER,
      },
      lowPriceEx: {
        type: Sequelize.INTEGER,
      },
      avg1: {
        type: Sequelize.INTEGER,
      },
      avg7: {
        type: Sequelize.INTEGER,
      },
      avg30: {
        type: Sequelize.INTEGER,
      },
      foilAvg1: {
        type: Sequelize.INTEGER,
      },
      foilAvg7: {
        type: Sequelize.INTEGER,
      },
      foilAvg30: {
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
    await queryInterface.dropTable("priceguides");
  },
};
