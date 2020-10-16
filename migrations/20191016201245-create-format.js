"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable("Formats", {
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
        queryInterface.bulkInsert("Formats", [
          //todo insert all columns of priceguide
          {
            name: "commander",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "duel",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "legacy",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "modern",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "vintage",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "penny",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "pauper",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "historic",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "pioneer",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "brawl",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "future",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "standard",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "oldschool",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Formats");
  },
};
