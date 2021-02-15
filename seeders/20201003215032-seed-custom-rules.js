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
          ruleTypeId: 2,
          priceRangeFrom: 1,
          priceRangeTo: 2,
          priceRangeValueToSet: 2,
          behaviourId: 8,
          mkmPriceGuideReference: 3,
          isForFoils: 0,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 3,
          ruleTypeId: 1,
          priceRangeFrom: 2,
          priceRangeTo: 6,
          priceRangeValueToSet: 7,
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
          ruleTypeId: 2,
          priceRangeFrom: 6,
          priceRangeTo: 10,
          priceRangeValueToSet: 11,
          behaviourId: 3,
          mkmPriceGuideReference: 1,
          isForFoils: 0,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 3,
          ruleTypeId: 3,
          priceRangeFrom: 10,
          priceRangeTo: 20,
          priceRangeValueToSet: 20,
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
          priceRangeFrom: 20,
          priceRangeTo: 25,
          priceRangeValueToSet: 25,
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
          ruleTypeId: 2,
          priceRangeFrom: 2,
          priceRangeTo: 3,
          priceRangeValueToSet: 2,
          behaviourId: 3,
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
          priceRangeFrom: 3,
          priceRangeTo: 5,
          priceRangeValueToSet: 5,
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
          priceRangeFrom: 5,
          priceRangeTo: 7,
          priceRangeValueToSet: 8,
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
          priceRangeFrom: 7,
          priceRangeTo: 10,
          priceRangeValueToSet: 12,
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
          priceRangeFrom: 10,
          priceRangeTo: 15,
          priceRangeValueToSet: 16,
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
          ruleTypeId: 2,
          priceRangeFrom: 15,
          priceRangeTo: 180,
          priceRangeValueToSet: 1,
          behaviourId: 12,
          mkmPriceGuideReference: 14,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        //Testing Behaviour definition 18
        {
          idScript: 3,
          ruleTypeId: 2,
          priceRangeFrom: 180,
          priceRangeTo: 190,
          priceRangeValueToSet: 1,
          behaviourId: 18,
          mkmPriceGuideReference: 14,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 4,
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
          idScript: 4,
          ruleTypeId: 2,
          priceRangeFrom: 1,
          priceRangeTo: 2,
          priceRangeValueToSet: 2,
          behaviourId: 8,
          mkmPriceGuideReference: 3,
          isForFoils: 0,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 4,
          ruleTypeId: 1,
          priceRangeFrom: 2,
          priceRangeTo: 6,
          priceRangeValueToSet: 7,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 0,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 4,
          ruleTypeId: 2,
          priceRangeFrom: 6,
          priceRangeTo: 10,
          priceRangeValueToSet: 11,
          behaviourId: 3,
          mkmPriceGuideReference: 1,
          isForFoils: 0,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 4,
          ruleTypeId: 3,
          priceRangeFrom: 10,
          priceRangeTo: 20,
          priceRangeValueToSet: 20,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 0,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 4,
          ruleTypeId: 1,
          priceRangeFrom: 20,
          priceRangeTo: 25,
          priceRangeValueToSet: 25,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 0,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 4,
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
          idScript: 4,
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
          idScript: 4,
          ruleTypeId: 2,
          priceRangeFrom: 2,
          priceRangeTo: 3,
          priceRangeValueToSet: 2,
          behaviourId: 3,
          mkmPriceGuideReference: 1,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 4,
          ruleTypeId: 1,
          priceRangeFrom: 3,
          priceRangeTo: 5,
          priceRangeValueToSet: 5,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 4,
          ruleTypeId: 1,
          priceRangeFrom: 5,
          priceRangeTo: 7,
          priceRangeValueToSet: 8,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 4,
          ruleTypeId: 1,
          priceRangeFrom: 7,
          priceRangeTo: 10,
          priceRangeValueToSet: 12,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 4,
          ruleTypeId: 1,
          priceRangeFrom: 10,
          priceRangeTo: 15,
          priceRangeValueToSet: 16,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 4,
          ruleTypeId: 2,
          priceRangeFrom: 15,
          priceRangeTo: 180,
          priceRangeValueToSet: 1,
          behaviourId: 12,
          mkmPriceGuideReference: 14,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        //Testing Behaviour definition 17
        {
          idScript: 4,
          ruleTypeId: 2,
          priceRangeFrom: 180,
          priceRangeTo: 190,
          priceRangeValueToSet: 1,
          behaviourId: 17,
          mkmPriceGuideReference: 14,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 5,
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
          idScript: 5,
          ruleTypeId: 2,
          priceRangeFrom: 1,
          priceRangeTo: 2,
          priceRangeValueToSet: 2,
          behaviourId: 8,
          mkmPriceGuideReference: 3,
          isForFoils: 0,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 5,
          ruleTypeId: 1,
          priceRangeFrom: 2,
          priceRangeTo: 6,
          priceRangeValueToSet: 7,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 0,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 5,
          ruleTypeId: 2,
          priceRangeFrom: 6,
          priceRangeTo: 10,
          priceRangeValueToSet: 11,
          behaviourId: 3,
          mkmPriceGuideReference: 1,
          isForFoils: 0,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 5,
          ruleTypeId: 3,
          priceRangeFrom: 10,
          priceRangeTo: 20,
          priceRangeValueToSet: 20,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 0,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 5,
          ruleTypeId: 1,
          priceRangeFrom: 20,
          priceRangeTo: 25,
          priceRangeValueToSet: 25,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 0,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 5,
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
          idScript: 5,
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
          idScript: 5,
          ruleTypeId: 2,
          priceRangeFrom: 2,
          priceRangeTo: 3,
          priceRangeValueToSet: 2,
          behaviourId: 3,
          mkmPriceGuideReference: 1,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 5,
          ruleTypeId: 1,
          priceRangeFrom: 3,
          priceRangeTo: 5,
          priceRangeValueToSet: 5,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 5,
          ruleTypeId: 1,
          priceRangeFrom: 5,
          priceRangeTo: 7,
          priceRangeValueToSet: 8,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 5,
          ruleTypeId: 1,
          priceRangeFrom: 7,
          priceRangeTo: 10,
          priceRangeValueToSet: 12,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 5,
          ruleTypeId: 1,
          priceRangeFrom: 10,
          priceRangeTo: 15,
          priceRangeValueToSet: 16,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 5,
          ruleTypeId: 2,
          priceRangeFrom: 15,
          priceRangeTo: 180,
          priceRangeValueToSet: 1,
          behaviourId: 12,
          mkmPriceGuideReference: 14,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 6,
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
          idScript: 6,
          ruleTypeId: 2,
          priceRangeFrom: 1,
          priceRangeTo: 2,
          priceRangeValueToSet: 2,
          behaviourId: 8,
          mkmPriceGuideReference: 3,
          isForFoils: 0,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 6,
          ruleTypeId: 1,
          priceRangeFrom: 2,
          priceRangeTo: 6,
          priceRangeValueToSet: 7,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 0,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 6,
          ruleTypeId: 2,
          priceRangeFrom: 6,
          priceRangeTo: 10,
          priceRangeValueToSet: 11,
          behaviourId: 3,
          mkmPriceGuideReference: 1,
          isForFoils: 0,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 6,
          ruleTypeId: 3,
          priceRangeFrom: 10,
          priceRangeTo: 20,
          priceRangeValueToSet: 20,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 0,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 6,
          ruleTypeId: 1,
          priceRangeFrom: 20,
          priceRangeTo: 25,
          priceRangeValueToSet: 25,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 0,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 6,
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
          idScript: 6,
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
          idScript: 6,
          ruleTypeId: 2,
          priceRangeFrom: 2,
          priceRangeTo: 3,
          priceRangeValueToSet: 2,
          behaviourId: 3,
          mkmPriceGuideReference: 1,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 6,
          ruleTypeId: 1,
          priceRangeFrom: 3,
          priceRangeTo: 5,
          priceRangeValueToSet: 5,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 6,
          ruleTypeId: 1,
          priceRangeFrom: 5,
          priceRangeTo: 7,
          priceRangeValueToSet: 8,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 6,
          ruleTypeId: 1,
          priceRangeFrom: 7,
          priceRangeTo: 10,
          priceRangeValueToSet: 12,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 6,
          ruleTypeId: 1,
          priceRangeFrom: 10,
          priceRangeTo: 15,
          priceRangeValueToSet: 16,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 6,
          ruleTypeId: 2,
          priceRangeFrom: 15,
          priceRangeTo: 180,
          priceRangeValueToSet: 1,
          behaviourId: 12,
          mkmPriceGuideReference: 14,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 7,
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
          idScript: 7,
          ruleTypeId: 2,
          priceRangeFrom: 1,
          priceRangeTo: 2,
          priceRangeValueToSet: 2,
          behaviourId: 8,
          mkmPriceGuideReference: 3,
          isForFoils: 0,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 7,
          ruleTypeId: 1,
          priceRangeFrom: 2,
          priceRangeTo: 6,
          priceRangeValueToSet: 7,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 0,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 7,
          ruleTypeId: 2,
          priceRangeFrom: 6,
          priceRangeTo: 10,
          priceRangeValueToSet: 11,
          behaviourId: 3,
          mkmPriceGuideReference: 1,
          isForFoils: 0,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 7,
          ruleTypeId: 3,
          priceRangeFrom: 10,
          priceRangeTo: 20,
          priceRangeValueToSet: 20,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 0,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 7,
          ruleTypeId: 1,
          priceRangeFrom: 20,
          priceRangeTo: 25,
          priceRangeValueToSet: 25,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 0,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 7,
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
          idScript: 7,
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
          idScript: 7,
          ruleTypeId: 2,
          priceRangeFrom: 2,
          priceRangeTo: 3,
          priceRangeValueToSet: 2,
          behaviourId: 3,
          mkmPriceGuideReference: 1,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 7,
          ruleTypeId: 1,
          priceRangeFrom: 3,
          priceRangeTo: 5,
          priceRangeValueToSet: 5,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 7,
          ruleTypeId: 1,
          priceRangeFrom: 5,
          priceRangeTo: 7,
          priceRangeValueToSet: 8,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 7,
          ruleTypeId: 1,
          priceRangeFrom: 7,
          priceRangeTo: 10,
          priceRangeValueToSet: 12,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 7,
          ruleTypeId: 1,
          priceRangeFrom: 10,
          priceRangeTo: 15,
          priceRangeValueToSet: 16,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 7,
          ruleTypeId: 2,
          priceRangeFrom: 15,
          priceRangeTo: 180,
          priceRangeValueToSet: 1,
          behaviourId: 12,
          mkmPriceGuideReference: 14,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 8,
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
          idScript: 8,
          ruleTypeId: 2,
          priceRangeFrom: 1,
          priceRangeTo: 2,
          priceRangeValueToSet: 2,
          behaviourId: 8,
          mkmPriceGuideReference: 3,
          isForFoils: 0,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 8,
          ruleTypeId: 1,
          priceRangeFrom: 2,
          priceRangeTo: 6,
          priceRangeValueToSet: 7,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 0,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 8,
          ruleTypeId: 2,
          priceRangeFrom: 6,
          priceRangeTo: 10,
          priceRangeValueToSet: 11,
          behaviourId: 3,
          mkmPriceGuideReference: 1,
          isForFoils: 0,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 8,
          ruleTypeId: 3,
          priceRangeFrom: 10,
          priceRangeTo: 20,
          priceRangeValueToSet: 20,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 0,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 8,
          ruleTypeId: 1,
          priceRangeFrom: 20,
          priceRangeTo: 25,
          priceRangeValueToSet: 25,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 0,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 8,
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
          idScript: 8,
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
          idScript: 8,
          ruleTypeId: 2,
          priceRangeFrom: 2,
          priceRangeTo: 3,
          priceRangeValueToSet: 2,
          behaviourId: 3,
          mkmPriceGuideReference: 1,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 8,
          ruleTypeId: 1,
          priceRangeFrom: 3,
          priceRangeTo: 5,
          priceRangeValueToSet: 5,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 8,
          ruleTypeId: 1,
          priceRangeFrom: 5,
          priceRangeTo: 7,
          priceRangeValueToSet: 8,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 8,
          ruleTypeId: 1,
          priceRangeFrom: 7,
          priceRangeTo: 10,
          priceRangeValueToSet: 12,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 8,
          ruleTypeId: 1,
          priceRangeFrom: 10,
          priceRangeTo: 15,
          priceRangeValueToSet: 16,
          behaviourId: 1,
          mkmPriceGuideReference: 1,
          isForFoils: 1,
          isForSigned: 0,
          isForPlaysets: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idScript: 8,
          ruleTypeId: 2,
          priceRangeFrom: 15,
          priceRangeTo: 180,
          priceRangeValueToSet: 1,
          behaviourId: 12,
          mkmPriceGuideReference: 14,
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
