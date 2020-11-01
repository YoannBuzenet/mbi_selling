"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Custom_Rules",
      [
        {
          idScript: 1,
          ruleTypeId: 1,
          priceRangeFrom: 0,
          priceRangeTo: 1,
          priceRangeValueToSet: 1,
          behaviourId: 2,
          mkmPriceGuideReference: 1,
          isForFoils: 0,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 3,
          ruleTypeId: 1,
          priceRangeFrom: 0,
          priceRangeTo: 1,
          priceRangeValueToSet: 1,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 0,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 3,
          ruleTypeId: 1,
          priceRangeFrom: 1,
          priceRangeTo: 2,
          priceRangeValueToSet: 2,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 0,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 3,
          ruleTypeId: 1,
          priceRangeFrom: 0,
          priceRangeTo: 1,
          priceRangeValueToSet: 2,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 3,
          ruleTypeId: 1,
          priceRangeFrom: 1,
          priceRangeTo: 2,
          priceRangeValueToSet: 2,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 3,
          ruleTypeId: 1,
          priceRangeFrom: 2,
          priceRangeTo: 3,
          priceRangeValueToSet: 2,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 1,
          ruleTypeId: 1,
          priceRangeFrom: 1,
          priceRangeTo: 2,
          priceRangeValueToSet: 2,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 0,
          isForSigned: 0,
          isForPlaysets: 0,
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
    return queryInterface.bulkDelete("Custom_Rules", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
