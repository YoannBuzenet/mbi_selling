"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const db = require("../models/index");

    return await db.Invoice.bulkCreate(
      [
        // Are missing : stat / end subscribing date
        {
          idShop: 57,
          idInvoice: 1,
          userName: "utilisateur de test créé via Seed",
          userAddress: "5 rue des lilas",
          userPostalCode: "56700",
          userTown: "hennebont",
          amountTaxIncluded: 29,
          amountTaxExcluded: 29,
          productName: "Product Test Seed",
          VATSum: 0,
          VATStatus: 0,
        },
      ],
      {}
    );

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Invoice", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
