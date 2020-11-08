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
        allowNull: false,
        references: {
          model: "productlegalities",
          key: "idProduct",
        },
      },
      avgSellPrice: {
        type: Sequelize.FLOAT,
      },
      lowPrice: {
        type: Sequelize.FLOAT,
      },
      trendPrice: {
        type: Sequelize.FLOAT,
      },
      germanProLow: {
        type: Sequelize.FLOAT,
      },
      suggestedPrice: {
        type: Sequelize.FLOAT,
      },
      foilSell: {
        type: Sequelize.FLOAT,
      },
      foilLow: {
        type: Sequelize.FLOAT,
      },
      foilTrend: {
        type: Sequelize.FLOAT,
      },
      lowPriceEx: {
        type: Sequelize.FLOAT,
      },
      avg1: {
        type: Sequelize.FLOAT,
      },
      avg7: {
        type: Sequelize.FLOAT,
      },
      avg30: {
        type: Sequelize.FLOAT,
      },
      foilAvg1: {
        type: Sequelize.FLOAT,
      },
      foilAvg7: {
        type: Sequelize.FLOAT,
      },
      foilAvg30: {
        type: Sequelize.FLOAT,
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
