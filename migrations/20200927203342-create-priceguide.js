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
        type: Sequelize.DECIMAL,
      },
      lowPrice: {
        type: Sequelize.DECIMAL,
      },
      trendPrice: {
        type: Sequelize.DECIMAL,
      },
      germanProLow: {
        type: Sequelize.DECIMAL,
      },
      suggestedPrice: {
        type: Sequelize.DECIMAL,
      },
      foilSell: {
        type: Sequelize.DECIMAL,
      },
      foilLow: {
        type: Sequelize.DECIMAL,
      },
      foilTrend: {
        type: Sequelize.DECIMAL,
      },
      lowPriceEx: {
        type: Sequelize.DECIMAL,
      },
      avg1: {
        type: Sequelize.DECIMAL,
      },
      avg7: {
        type: Sequelize.DECIMAL,
      },
      avg30: {
        type: Sequelize.DECIMAL,
      },
      foilAvg1: {
        type: Sequelize.DECIMAL,
      },
      foilAvg7: {
        type: Sequelize.DECIMAL,
      },
      foilAvg30: {
        type: Sequelize.DECIMAL,
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
