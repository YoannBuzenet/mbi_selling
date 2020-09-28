"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable("PriceGuideDefinitions", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(function () {
        queryInterface.bulkInsert("priceguidesdefinition", [
          //todo insert all columns of priceguide
          {
            name: "AvgSellPrice",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "lowPrice",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "trendPrice",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "germanProLow",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "suggestedPrice",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "foilSell",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "foilLow",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "foilTrend",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "lowPriceEx",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "avg1",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "avg7",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "avg30",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "foilAvg1",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "foilAvg7",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "foilAvg30",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("PriceGuideDefinitions");
  },
};
