"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Scripts",
      [
        {
          idShop: 4,
          idFormat: 1,
          name: "Le premier script",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idShop: 4,
          idFormat: 12,
          name: "Le second script",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Scripts", null, {});
  },
};
