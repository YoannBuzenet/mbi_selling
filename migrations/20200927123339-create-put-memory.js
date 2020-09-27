"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("put_memories", {
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
          model: "scripts",
          key: "id",
        },
      },
      idProduct: {
        type: Sequelize.INTEGER,
      },
      oldPrice: {
        type: Sequelize.INTEGER,
      },
      newPrice: {
        type: Sequelize.INTEGER,
      },
      condition: {
        type: Sequelize.INTEGER,
      },
      lang: {
        type: Sequelize.INTEGER,
      },
      isFoil: {
        type: Sequelize.INTEGER,
      },
      isSigned: {
        type: Sequelize.INTEGER,
      },
      isPlayset: {
        type: Sequelize.INTEGER,
      },
      idCustomRuleUsed: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "snapshot_custom_rules",
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
    await queryInterface.dropTable("put_memories");
  },
};
