"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const db = require("../models/index");

    return await db.Rarity.bulkCreate(
      [
        {
          idScript: 3,
          name: "common",
        },
        {
          idScript: 4,
          name: "common",
        },
        {
          idScript: 5,
          name: "rare",
        },
        {
          idScript: 6,
          name: "uncommon",
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
