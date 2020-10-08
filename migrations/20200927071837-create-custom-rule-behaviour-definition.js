"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable("customRule_behaviour_definitions", {
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
        queryInterface.bulkInsert("customRule_behaviour_definitions", [
          {
            name: "roundUp5percents",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundUp10percents",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundUp15percents",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundUp20percents",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundUp30percents",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundUp50percents",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundDown5percents",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundDown10percents",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundDown15percents",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundDown20percents",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundDown30percents",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundDown50percents",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundUp0.5",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundUp1",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundUp2",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundUp5",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundUp10",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundUp15",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundUp20",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundUp50",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundUp100",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundDown0.5",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundDown1",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundDown2",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundDown5",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundDown10",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundDown15",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundDown20",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundDown50",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundDown100",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          // TODO Ajouter les autre règles (roundDown, exlure...)
        ]);
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("customRule_behaviour_definitions");
  },
};
