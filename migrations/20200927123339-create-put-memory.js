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
      idArticle: {
        type: Sequelize.INTEGER,
      },
      oldPrice: {
        type: Sequelize.FLOAT,
      },
      newPrice: {
        type: Sequelize.FLOAT,
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
      behaviourChosen: {
        type: Sequelize.STRING,
      },
      idCustomRuleUsed: {
        type: Sequelize.INTEGER,
        validate: { isNumeric: true },
      },
      PUT_Request_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "PUT_Requests",
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
