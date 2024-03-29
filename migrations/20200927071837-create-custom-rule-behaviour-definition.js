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
        type: {
          type: Sequelize.STRING,
        },
        sense: {
          type: Sequelize.STRING,
        },
        coefficient: {
          type: Sequelize.FLOAT,
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
            coefficient: 1.05,
            type: "percent",
            sense: "up",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundUp10percents",
            coefficient: 1.1,
            type: "percent",
            sense: "up",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundUp15percents",
            coefficient: 1.15,
            type: "percent",
            sense: "up",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundUp20percents",
            coefficient: 1.2,
            type: "percent",
            sense: "up",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundUp30percents",
            coefficient: 1.3,
            type: "percent",
            sense: "up",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundUp50percents",
            coefficient: 1.5,
            type: "percent",
            sense: "up",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundDown5percents",
            coefficient: 1.05,
            type: "percent",
            sense: "down",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundDown10percents",
            coefficient: 1.1,
            type: "percent",
            sense: "down",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundDown15percents",
            coefficient: 1.15,
            type: "percent",
            sense: "down",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundDown20percents",
            coefficient: 1.2,
            type: "percent",
            sense: "down",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundDown30percents",
            coefficient: 1.3,
            type: "percent",
            sense: "down",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundDown50percents",
            coefficient: 1.5,
            type: "percent",
            sense: "down",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundUp0.5",
            coefficient: 0.5,
            type: "number",
            sense: "up",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundUp1",
            coefficient: 1,
            type: "number",
            sense: "up",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundUp2",
            coefficient: 2,
            type: "number",
            sense: "up",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundUp5",
            coefficient: 5,
            type: "number",
            sense: "up",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundUp10",
            coefficient: 10,
            type: "number",
            sense: "up",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundUp15",
            coefficient: 15,
            type: "number",
            sense: "up",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundUp20",
            coefficient: 20,
            type: "number",
            sense: "up",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundUp50",
            coefficient: 50,
            type: "number",
            sense: "up",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundUp100",
            coefficient: 100,
            type: "number",
            sense: "up",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundDown0.5",
            coefficient: 0.5,
            type: "number",
            sense: "down",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundDown1",
            coefficient: 1,
            type: "number",
            sense: "down",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundDown2",
            coefficient: 2,
            type: "number",
            sense: "down",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundDown5",
            coefficient: 5,
            type: "number",
            sense: "down",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundDown10",
            coefficient: 10,
            type: "number",
            sense: "down",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundDown15",
            coefficient: 15,
            type: "number",
            sense: "down",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundDown20",
            coefficient: 20,
            type: "number",
            sense: "down",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundDown50",
            coefficient: 50,
            type: "number",
            sense: "down",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "roundDown100",
            coefficient: 100,
            type: "number",
            sense: "down",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("customRule_behaviour_definitions");
  },
};
