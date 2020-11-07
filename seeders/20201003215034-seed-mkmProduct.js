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
          englishName: "ok",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 5,
          language: 6,
          condition: 7,
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
          englishName: "ok",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 5,
          language: 6,
          condition: 7,
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
          englishName: "ok",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 5,
          language: 6,
          condition: 7,
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
          englishName: "ok",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 5,
          language: 6,
          condition: 7,
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
          condition: 7,
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
          condition: 7,
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
          condition: 7,
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
          condition: 7,
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
          condition: 7,
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
        {
          idArticle: 9,
          idProduct: 110,
          englishName: "ok",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 5,
          language: 6,
          condition: 7,
          isFoil: 0,
          isSigned: 0,
          isPlayset: 0,
          isAltered: 0,
          comments: 0,
          amount: 10,
          productLegalityId: 12,
          onSale: 0,
          idCurrency: 1,
          currencyCode: "EUR",
          idShop: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          idArticle: 10,
          idProduct: 1,
          englishName: "ok",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 5,
          language: 6,
          condition: 7,
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
        {
          idArticle: 15,
          idProduct: 101,
          englishName: "ok",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 5,
          language: 6,
          condition: 7,
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
        {
          idArticle: 158,
          idProduct: 16236,
          englishName: "ok",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 50000,
          language: 6,
          condition: 7,
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
        {
          idArticle: 159,
          idProduct: 16236,
          englishName: "ok",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 40,
          language: 6,
          condition: 7,
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
