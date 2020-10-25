"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "productLegalities",
      [
        {
          idProduct: 1,
          idSet: 1,
          isLegalCommander: 0,
          isLegalDuel: 1,
          isLegalLegacy: null,
          isLegalModern: 2,
          isLegalVintage: 1,
          isLegalPenny: 0,
          isLegalPauper: 0,
          isLegalHistoric: 0,
          isLegalPioneer: 0,
          isLegalBrawl: 0,
          isLegalFuture: 0,
          isLegalStandard: 0,
          isLegalOldSchool: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
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
    return queryInterface.bulkDelete("productLegalities", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
