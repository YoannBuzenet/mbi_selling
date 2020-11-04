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
      ruleTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "customRule_ruleType_definitions",
          key: "id",
        },
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
        type: Sequelize.FLOAT,
      },
      priceRangeTo: {
        type: Sequelize.FLOAT,
      },
      behaviourId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "customRule_behaviour_definitions",
          key: "id",
        },
      },
      priceRangeValueToSet: {
        type: Sequelize.FLOAT,
      },
      mkmPriceGuideReference: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "PriceGuideDefinitions",
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
