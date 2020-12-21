"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Invoices", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idShop: {
        type: Sequelize.INTEGER,
      },
      idInvoice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      subscribingStartDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      subscribingEndDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      amountTaxIncluded: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      amountTaxExcluded: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      VATSum: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      VATStatus: { type: Sequelize.INTEGER, allowNull: false },
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
    await queryInterface.dropTable("Invoices");
  },
};
