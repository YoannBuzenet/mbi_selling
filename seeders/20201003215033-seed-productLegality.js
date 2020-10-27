"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "productLegalities",
      [
        {
          idProduct: 1,
          idSet: 1,
          isLegalCommander: 1,
          isLegalDuel: 0,
          isLegalLegacy: 1,
          isLegalModern: 0,
          isLegalVintage: 0,
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
        {
          idProduct: 3233,
          idSet: 1,
          isLegalCommander: 0,
          isLegalDuel: 1,
          isLegalLegacy: 0,
          isLegalModern: 0,
          isLegalVintage: 0,
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
        {
          idProduct: 101,
          idSet: 1,
          isLegalCommander: 0,
          isLegalDuel: 0,
          isLegalLegacy: 1,
          isLegalModern: 0,
          isLegalVintage: 0,
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
        {
          idProduct: 102,
          idSet: 1,
          isLegalCommander: 0,
          isLegalDuel: 0,
          isLegalLegacy: 0,
          isLegalModern: 1,
          isLegalVintage: 0,
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
        {
          idProduct: 103,
          idSet: 1,
          isLegalCommander: 0,
          isLegalDuel: 0,
          isLegalLegacy: 0,
          isLegalModern: 0,
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
        {
          idProduct: 104,
          idSet: 1,
          isLegalCommander: 0,
          isLegalDuel: 0,
          isLegalLegacy: 0,
          isLegalModern: 0,
          isLegalVintage: 0,
          isLegalPenny: 1,
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
        {
          idProduct: 105,
          idSet: 1,
          isLegalCommander: 0,
          isLegalDuel: 0,
          isLegalLegacy: 0,
          isLegalModern: 0,
          isLegalVintage: 0,
          isLegalPenny: 0,
          isLegalPauper: 1,
          isLegalHistoric: 0,
          isLegalPioneer: 0,
          isLegalBrawl: 0,
          isLegalFuture: 0,
          isLegalStandard: 0,
          isLegalOldSchool: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idProduct: 106,
          idSet: 1,
          isLegalCommander: 0,
          isLegalDuel: 0,
          isLegalLegacy: 0,
          isLegalModern: 0,
          isLegalVintage: 0,
          isLegalPenny: 0,
          isLegalPauper: 0,
          isLegalHistoric: 1,
          isLegalPioneer: 0,
          isLegalBrawl: 0,
          isLegalFuture: 0,
          isLegalStandard: 0,
          isLegalOldSchool: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idProduct: 107,
          idSet: 1,
          isLegalCommander: 0,
          isLegalDuel: 0,
          isLegalLegacy: 0,
          isLegalModern: 0,
          isLegalVintage: 0,
          isLegalPenny: 0,
          isLegalPauper: 0,
          isLegalHistoric: 0,
          isLegalPioneer: 1,
          isLegalBrawl: 0,
          isLegalFuture: 0,
          isLegalStandard: 0,
          isLegalOldSchool: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idProduct: 108,
          idSet: 1,
          isLegalCommander: 0,
          isLegalDuel: 0,
          isLegalLegacy: 0,
          isLegalModern: 0,
          isLegalVintage: 0,
          isLegalPenny: 0,
          isLegalPauper: 0,
          isLegalHistoric: 0,
          isLegalPioneer: 0,
          isLegalBrawl: 1,
          isLegalFuture: 0,
          isLegalStandard: 0,
          isLegalOldSchool: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idProduct: 109,
          idSet: 1,
          isLegalCommander: 0,
          isLegalDuel: 0,
          isLegalLegacy: 0,
          isLegalModern: 0,
          isLegalVintage: 0,
          isLegalPenny: 0,
          isLegalPauper: 0,
          isLegalHistoric: 0,
          isLegalPioneer: 0,
          isLegalBrawl: 0,
          isLegalFuture: 1,
          isLegalStandard: 0,
          isLegalOldSchool: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idProduct: 110,
          idSet: 1,
          isLegalCommander: 0,
          isLegalDuel: 0,
          isLegalLegacy: 0,
          isLegalModern: 0,
          isLegalVintage: 0,
          isLegalPenny: 0,
          isLegalPauper: 0,
          isLegalHistoric: 0,
          isLegalPioneer: 0,
          isLegalBrawl: 0,
          isLegalFuture: 0,
          isLegalStandard: 1,
          isLegalOldSchool: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idProduct: 111,
          idSet: 1,
          isLegalCommander: 0,
          isLegalDuel: 0,
          isLegalLegacy: 0,
          isLegalModern: 0,
          isLegalVintage: 0,
          isLegalPenny: 0,
          isLegalPauper: 0,
          isLegalHistoric: 0,
          isLegalPioneer: 0,
          isLegalBrawl: 0,
          isLegalFuture: 0,
          isLegalStandard: 0,
          isLegalOldSchool: 1,
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
