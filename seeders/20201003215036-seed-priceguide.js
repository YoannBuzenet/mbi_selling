"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const db = require("../models/index");

    return await db.priceguide.bulkCreate(
      [
        // This one is used to test 0 <= X <= 1 prices
        {
          idProduct: 16229,
          AvgSellPrice: 0.58,
          lowPrice: 0.45,
          trendPrice: 0.53,
          germanProLow: 0.75,
          suggestedPrice: 1.25,
          foilSell: 1.35,
          foilLow: 1.12,
          foilTrend: 1.5,
          lowPriceEx: 0.52,
          avg1: 0.46,
          avg7: 0.47,
          avg30: 0.48,
          foilAvg1: 1.32,
          foilAvg7: 1.33,
          foilAvg30: 1.34,
        },
        // This one is used to test 1 <= X <= 2 prices
        {
          idProduct: 16168,
          AvgSellPrice: 1.12,
          lowPrice: 1.01,
          trendPrice: 1.48,
          germanProLow: 1.6,
          suggestedPrice: 1.75,
          foilSell: 2.2,
          foilLow: 2,
          foilTrend: 2.1,
          lowPriceEx: 0.97,
          avg1: 1.04,
          avg7: 1.2,
          avg30: 1.3,
          foilAvg1: 2.1,
          foilAvg7: 2.2,
          foilAvg30: 2.3,
        },
        // This one is used to test 6 <= X <= 10 prices
        {
          idProduct: 16511,
          AvgSellPrice: 7,
          lowPrice: 5.5,
          trendPrice: 7.5,
          germanProLow: 8,
          suggestedPrice: 8.5,
          foilSell: 12,
          foilLow: 11,
          foilTrend: 12.5,
          lowPriceEx: 6,
          avg1: 7.4,
          avg7: 7.41,
          avg30: 7.42,
          foilAvg1: 12.6,
          foilAvg7: 12.7,
          foilAvg30: 12.8,
        },
        // This one is used to test exclude behaviour
        {
          idProduct: 16483,
          AvgSellPrice: 1,
          lowPrice: 2,
          trendPrice: 3,
          germanProLow: 4,
          suggestedPrice: 5,
          foilSell: 6,
          foilLow: 7,
          foilTrend: 8,
          lowPriceEx: 9,
          avg1: 10,
          avg7: 11,
          avg30: 12,
          foilAvg1: 13,
          foilAvg7: 14,
          foilAvg30: 15,
        },
      ],
      {}
    );

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("priceguide", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
