"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const db = require("../models/index");

    return await db.Expansion.bulkCreate(
      [
        {
          idScript: 9,
          name: "Invasion",
        },
        {
          idScript: 9,
          name: "Tenth Edition",
        },
        {
          idScript: 10,
          name: "Invasion",
        },
        {
          idScript: 10,
          name: "Tenth Edition",
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
    return queryInterface.bulkDelete("Rarity", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
