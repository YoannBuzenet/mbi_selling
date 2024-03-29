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
          model: "Scripts",
          key: "id",
        },
      },
      idProduct: {
        type: Sequelize.INTEGER,
      },
      idArticle: {
        type: Sequelize.INTEGER,
      },
      cardName: { type: Sequelize.STRING },
      regularCardsTrend: {
        type: Sequelize.FLOAT,
        validate: { isNumeric: true },
      },
      foilCardsTrend: {
        type: Sequelize.FLOAT,
        validate: { isNumeric: true },
      },
      numberUserChoseToUse: {
        type: Sequelize.FLOAT,
        validate: { isNumeric: true },
      },
      priceShieldBlocked: {
        type: Sequelize.INTEGER,
        validate: { isNumeric: true },
      },
      priceShieldReason: {
        type: Sequelize.FLOAT,
        validate: { isNumeric: true },
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
      amount: {
        type: Sequelize.INTEGER,
      },
      comments: {
        type: Sequelize.STRING,
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
