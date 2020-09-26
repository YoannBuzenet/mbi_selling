"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("PUT_Requests", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      shopId: {
        type: Sequelize.INTEGER,
      },
      batchId: {
        type: Sequelize.INTEGER,
      },
      snapShotParamId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "snapshot_params",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("PUT_Requests");
  },
};
