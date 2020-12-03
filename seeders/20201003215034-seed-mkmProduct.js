"use strict";
// const path = require("path");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const db = require("../models/index");

    return await db.MkmProduct.bulkCreate(
      [
        {
          idArticle: 1,
          idProduct: 1,
          englishName: "testcardName1",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 5,
          language: 6,
          condition: "EX",
          isFoil: 0,
          isSigned: 0,
          isPlayset: 0,
          isAltered: 0,
          comments: 0,
          amount: 10,
          onSale: 0,
          idCurrency: 1,
          currencyCode: "EUR",
          idShop: 4,
          productLegalityId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idArticle: 1767,
          idProduct: 101,
          englishName: "testcardName2",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 5,
          language: 6,
          condition: "GD",
          isFoil: 0,
          isSigned: 0,
          isPlayset: 0,
          isAltered: 0,
          comments: 0,
          amount: 10,
          onSale: 0,
          idCurrency: 1,
          productLegalityId: 3,
          currencyCode: "EUR",
          idShop: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idArticle: 2,
          idProduct: 102,
          englishName: "testcardName3",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 5,
          language: 6,
          condition: "LP",
          isFoil: 0,
          isSigned: 0,
          isPlayset: 0,
          isAltered: 0,
          comments: 0,
          amount: 10,
          onSale: 0,
          idCurrency: 1,
          productLegalityId: 4,
          currencyCode: "EUR",
          idShop: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idArticle: 3,
          idProduct: 103,
          englishName: "testcardName4",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 5,
          language: 6,
          condition: "PO",
          isFoil: 0,
          isSigned: 0,
          isPlayset: 0,
          isAltered: 0,
          comments: 0,
          amount: 10,
          onSale: 0,
          idCurrency: 1,
          productLegalityId: 5,
          currencyCode: "EUR",
          idShop: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idArticle: 4,
          idProduct: 104,
          englishName: "ok",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 5,
          language: 6,
          condition: "PL",
          isFoil: 0,
          isSigned: 0,
          isPlayset: 0,
          isAltered: 0,
          comments: 0,
          amount: 10,
          onSale: 0,
          productLegalityId: 6,
          idCurrency: 1,
          currencyCode: "EUR",
          idShop: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idArticle: 5,
          idProduct: 105,
          englishName: "ok",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 5,
          language: 6,
          condition: "MT",
          isFoil: 0,
          isSigned: 0,
          isPlayset: 0,
          isAltered: 0,
          comments: 0,
          amount: 10,
          onSale: 0,
          idCurrency: 1,
          productLegalityId: 7,
          currencyCode: "EUR",
          idShop: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idArticle: 6,
          idProduct: 107,
          englishName: "ok",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 5,
          language: 6,
          condition: "PO",
          isFoil: 0,
          isSigned: 0,
          isPlayset: 0,
          isAltered: 0,
          comments: 0,
          amount: 10,
          onSale: 0,
          productLegalityId: 9,
          idCurrency: 1,
          currencyCode: "EUR",
          idShop: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idArticle: 7,
          idProduct: 108,
          englishName: "ok",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 5,
          language: 6,
          condition: "NM",
          isFoil: 0,
          isSigned: 0,
          isPlayset: 0,
          isAltered: 0,
          comments: 0,
          amount: 10,
          productLegalityId: 10,
          onSale: 0,
          idCurrency: 1,
          currencyCode: "EUR",
          idShop: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idArticle: 8,
          idProduct: 109,
          englishName: "ok",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 5,
          language: 6,
          condition: "GD",
          isFoil: 0,
          isSigned: 0,
          isPlayset: 0,
          isAltered: 0,
          comments: 0,
          amount: 10,
          productLegalityId: 11,
          onSale: 0,
          idCurrency: 1,
          currencyCode: "EUR",
          idShop: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        //Testing ruleTypeId 3 : this card should be excluded
        {
          idArticle: 9,
          idProduct: 16483,
          englishName: "ok",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 5,
          language: 6,
          condition: "PL",
          isFoil: 0,
          isSigned: 0,
          isPlayset: 0,
          isAltered: 0,
          comments: 0,
          amount: 10,
          productLegalityId: 3,
          onSale: 0,
          idCurrency: 1,
          currencyCode: "EUR",
          idShop: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        //Testing ruleTypeId 2 : this card should have +10%
        //trend between 1 <= X <= 2
        {
          idArticle: 10,
          idProduct: 16168,
          englishName: "ok",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 0.5,
          language: 6,
          condition: "PO",
          isFoil: 0,
          isSigned: 0,
          isPlayset: 0,
          isAltered: 0,
          comments: 0,
          amount: 10,
          onSale: 0,
          productLegalityId: 1,
          idCurrency: 1,
          currencyCode: "EUR",
          idShop: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        //Testing ruleTypeId 2 : this card should be blocked by Priceshield (trying to do +10%)
        //trend between 1 <= X <= 2
        {
          idArticle: 15,
          idProduct: 16168,
          englishName: "ok",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 7,
          language: 6,
          condition: "EX",
          isFoil: 0,
          isSigned: 0,
          isPlayset: 0,
          isAltered: 0,
          comments: 0,
          amount: 10,
          onSale: 0,
          idCurrency: 1,
          productLegalityId: 3,
          currencyCode: "EUR",
          idShop: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        //Testing ruleTypeId 2 : this card should have +15%
        {
          idArticle: 158,
          idProduct: 16511,
          englishName: "ok",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 6,
          language: 6,
          condition: "MT",
          isFoil: 0,
          isSigned: 0,
          isPlayset: 0,
          isAltered: 0,
          comments: 0,
          amount: 10,
          onSale: 0,
          idCurrency: 1,
          productLegalityId: 3,
          currencyCode: "EUR",
          idShop: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        //Testing ruleTypeId 2 : this card should be blocked by Priceshield (trying to do +15%)
        {
          idArticle: 159,
          idProduct: 16511,
          englishName: "testcardName6",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 25,
          language: 6,
          condition: "LP",
          isFoil: 0,
          isSigned: 0,
          isPlayset: 0,
          isAltered: 0,
          comments: 0,
          amount: 10,
          onSale: 0,
          idCurrency: 1,
          productLegalityId: 3,
          currencyCode: "EUR",
          idShop: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        //Testing ruleTypeId 1 : this card should be set to 1
        //trend between 0 <= X <= 1
        {
          idArticle: 169,
          idProduct: 16229,
          englishName: "testcardName7",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 0.2,
          language: 6,
          condition: "NM",
          isFoil: 0,
          isSigned: 0,
          isPlayset: 0,
          isAltered: 0,
          comments: 0,
          amount: 10,
          onSale: 0,
          idCurrency: 1,
          productLegalityId: 3,
          currencyCode: "EUR",
          idShop: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        //Testing ruleTypeId 1 : this card should be set blocked by the priceshield
        //trend between 0 <= X <= 1
        {
          idArticle: 179,
          idProduct: 16229,
          englishName: "ok",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 150,
          language: 6,
          condition: "NM",
          isFoil: 0,
          isSigned: 0,
          isPlayset: 0,
          isAltered: 0,
          comments: 0,
          amount: 10,
          onSale: 0,
          idCurrency: 1,
          productLegalityId: 3,
          currencyCode: "EUR",
          idShop: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {
        include: [db.productLegalities],
      }
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
    return queryInterface.bulkDelete("MkmProducts", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
