"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable("customRule_ruleType_definitions", {
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
        queryInterface.bulkInsert("customRule_ruleType_definitions", [
          {
            name: "setValue",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "operationsApplying",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "exclude",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("customRule_ruleType_definitions");
  },
};
