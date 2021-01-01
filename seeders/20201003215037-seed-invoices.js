"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const db = require("../models/index");

    return await db.Invoice.bulkCreate(
      [
        // Invoice completed at first step
        {
          idShop: 7,
          idInvoice: 1,
          userName: "utilisateur de test créé via Seed",
          userAddress: "5 rue des lilas",
          userPostalCode: "56700",
          userTown: "hennebont",
          amountTaxIncluded: 29,
          amountTaxExcluded: 29,
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
