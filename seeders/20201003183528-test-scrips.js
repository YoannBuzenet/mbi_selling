"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Scripts",
      [
        {
          idShop: 1,
          name: "Le premier script",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idShop: 1,
          name: "Le second script",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
