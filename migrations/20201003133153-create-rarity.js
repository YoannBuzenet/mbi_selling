"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable("rarities", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        idScript: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "Scripts",
            key: "id",
          },
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
        queryInterface.bulkInsert("rarities", [
          {
            name: "rare",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "uncommon",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "common",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            name: "mythic",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("rarities");
  },
};
