"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const db = require("../models/index");

    return await db.Keyword.bulkCreate(
      [
        {
          idScript: 3,
          name: "testKeyword",
        },
        {
          idScript: 4,
          name: "testSeedKeyword",
        },
        {
          idScript: 5,
          name: "testSeedKeyword Script 5",
        },
        {
          idScript: 6,
          name: "testSeedKeyword Script 6",
        },
        {
          idScript: 12,
          name: "kkkkkk",
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
    return queryInterface.bulkDelete("Keyword", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
