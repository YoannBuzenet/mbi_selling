"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Scripts",
      [
        {
          idShop: 4,
          name: "Le premier script",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idShop: 4,
          name: "Le second script",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    //TODO
    // ADD N formats to N scripts
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Scripts", null, {});
  },
};
