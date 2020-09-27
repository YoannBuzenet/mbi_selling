"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Custom_Rules", {
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
      //Can be "Price Range"
      ruleType: {
        type: Sequelize.STRING,
      },
      isForFoils: {
        type: Sequelize.INTEGER,
      },
      isForSigned: {
        type: Sequelize.INTEGER,
      },
      isForPlaysets: {
        type: Sequelize.INTEGER,
      },
      priceRangeFrom: {
        type: Sequelize.INTEGER,
      },
      priceRangeTo: {
        type: Sequelize.INTEGER,
      },
      //Can be SetValue, RoundUp0.5,RoundUp1,RoundUpX, RoundDownX, Exclude
      behaviour: {
        type: Sequelize.STRING,
      },
      priceRangeValueToSet: {
        type: Sequelize.INTEGER,
      },
      priceRangePercentageFromMkm: {
        type: Sequelize.INTEGER,
      },
      mkmPriceGuideReference: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "priceguideDefinitions",
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
    await queryInterface.dropTable("Custom_Rules");
  },
};
