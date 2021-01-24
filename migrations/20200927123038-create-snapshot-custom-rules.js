"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("snapshot_custom_rules", {
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
      //Which kind of type of rule ?
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
        type: Sequelize.INTEGER,
      },
      priceRangeTo: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("snapshot_custom_rules");
  },
};
