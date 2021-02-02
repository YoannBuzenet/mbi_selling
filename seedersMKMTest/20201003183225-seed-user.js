"use strict";

const utils = require("../server/services/utils");

// const db = require("../models/index");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          idShop: 4,
          shopKey: "seedTestShopKey",
          email: "testaccount@test.com",
          isSubscribedUntil: utils.createADateFromTodayAndAddMonths(6),
          temporarySecret: "test",
          temporaryLastProductPaid: "OneMonthSubscription",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idShop: 57,
          shopKey: "seedTestShopKey2",
          email: "testaccount2@test.com",
          isSubscribedUntil: utils.createADateFromTodayAndAddMonths(1),
          temporarySecret: "test2",
          temporaryLastProductPaid: "ThreeMonthSubscription",
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
    return queryInterface.bulkDelete("Users", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
