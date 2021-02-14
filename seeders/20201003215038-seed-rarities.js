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
          idScript: 3,
          name: "rare",
        },
        {
          idScript: 3,
          name: "uncommon",
        },
        {
          idScript: 3,
          name: "mythic",
        },
        {
          idScript: 4,
          name: "common",
        },
        {
          idScript: 4,
          name: "rare",
        },
        {
          idScript: 4,
          name: "uncommon",
        },
        {
          idScript: 4,
          name: "mythic",
        },
        {
          idScript: 5,
          name: "common",
        },
        {
          idScript: 5,
          name: "rare",
        },
        {
          idScript: 5,
          name: "uncommon",
        },
        {
          idScript: 5,
          name: "mythic",
        },
        {
          idScript: 6,
          name: "common",
        },
        {
          idScript: 6,
          name: "rare",
        },
        {
          idScript: 6,
          name: "uncommon",
        },
        {
          idScript: 6,
          name: "mythic",
        },
        {
          idScript: 7,
          name: "common",
        },
        {
          idScript: 7,
          name: "mythic",
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
