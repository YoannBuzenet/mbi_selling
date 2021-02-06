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
          comments: "bim ba da boum",
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
          comments: "hoho",
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
          comments: "OS-584",
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
          comments: "OS 584",
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
          comments: "test :O",
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
          comments: "",
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
          comments: "yay",
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
          comments: "CHK187",
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
          comments: "dd",
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
          price: 10,
          language: 6,
          condition: "PL",
          isFoil: 0,
          isSigned: 0,
          isPlayset: 0,
          isAltered: 0,
          comments: "CHK188",
          amount: 8,
          productLegalityId: 3,
          onSale: 0,
          idCurrency: 1,
          currencyCode: "EUR",
          idShop: 57,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        //Testing ruleTypeId 2 : this card should have +15%
        {
          idArticle: 10,
          idProduct: 16168,
          englishName: "ok",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 0.5,
          language: 4,
          condition: "EX",
          isFoil: 1,
          isSigned: 0,
          isPlayset: 0,
          isAltered: 0,
          comments: "CHK 188",
          amount: 6,
          onSale: 0,
          productLegalityId: 1,
          idCurrency: 1,
          currencyCode: "EUR",
          idShop: 57,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        //Testing ruleTypeId 2 : this card should do -10%
        {
          idArticle: 15,
          idProduct: 16168,
          englishName: "ok",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 1.3,
          language: 8,
          condition: "LP",
          isFoil: 0,
          isSigned: 0,
          isPlayset: 0,
          isAltered: 0,
          comments: "hu",
          amount: 4,
          onSale: 0,
          idCurrency: 1,
          productLegalityId: 3,
          currencyCode: "EUR",
          idShop: 57,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        //Testing ruleTypeId 2 : this card should have ruletype 1 (set value)
        {
          idArticle: 159,
          idProduct: 16511,
          englishName: "testcardName6",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 7,
          language: 11,
          condition: "GD",
          isFoil: 1,
          isSigned: 0,
          isPlayset: 0,
          isAltered: 0,
          comments: "it is a test",
          amount: 2,
          onSale: 0,
          idCurrency: 1,
          productLegalityId: 3,
          currencyCode: "EUR",
          idShop: 57,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Should trigger priceshield on set value
        {
          idArticle: 160,
          idProduct: 16511,
          englishName: "ok",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 60,
          language: 11,
          condition: "GD",
          isFoil: 1,
          isSigned: 0,
          isPlayset: 0,
          isAltered: 0,
          comments: "why not",
          amount: 52,
          onSale: 0,
          idCurrency: 1,
          productLegalityId: 3,
          currencyCode: "EUR",
          idShop: 57,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Should trigger priceshield on roundDown50percents (behaviour 12)
        {
          idArticle: 169,
          idProduct: 17851,
          englishName: "testcardName7",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 300,
          language: 1,
          condition: "NM",
          isFoil: 1,
          isSigned: 0,
          isPlayset: 0,
          isAltered: 0,
          comments: "seed product",
          amount: 87,
          onSale: 0,
          idCurrency: 1,
          productLegalityId: 3,
          currencyCode: "EUR",
          idShop: 57,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Should be Excluded because Signed
        {
          idArticle: 179,
          idProduct: 16229,
          englishName: "ok",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 0.8,
          language: 6,
          condition: "NM",
          isFoil: 0,
          isSigned: 1,
          isPlayset: 0,
          isAltered: 0,
          comments: "miiiii",
          amount: 11,
          onSale: 0,
          idCurrency: 1,
          productLegalityId: 3,
          currencyCode: "EUR",
          idShop: 57,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Should be Excluded because Playset
        {
          idArticle: 180,
          idProduct: 16229,
          englishName: "playsetCard",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 0.8,
          language: 6,
          condition: "NM",
          isFoil: 0,
          isSigned: 0,
          isPlayset: 1,
          isAltered: 0,
          comments: "kkkkkk",
          amount: 14,
          onSale: 0,
          idCurrency: 1,
          productLegalityId: 3,
          currencyCode: "EUR",
          idShop: 57,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          idArticle: 181,
          idProduct: 16229,
          englishName: "SignedCard",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 150,
          language: 6,
          condition: "NM",
          isFoil: 0,
          isSigned: 1,
          isPlayset: 0,
          isAltered: 0,
          comments: "+50% :o",
          amount: 10,
          onSale: 0,
          idCurrency: 1,
          productLegalityId: 3,
          currencyCode: "EUR",
          idShop: 57,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          idArticle: 182,
          idProduct: 16229,
          englishName: "alteredCard",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 150,
          language: 6,
          condition: "NM",
          isFoil: 0,
          isSigned: 0,
          isPlayset: 0,
          isAltered: 1,
          comments: "+20cc",
          amount: 10,
          onSale: 0,
          idCurrency: 1,
          productLegalityId: 3,
          currencyCode: "EUR",
          idShop: 57,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // This card has no priceguide and enables us to test if the script can handle it without crashing
        {
          idArticle: 1820,
          idProduct: 3200,
          englishName: "alteredCard",
          localName: "ok",
          Exp: 5,
          expName: "ok",
          price: 150,
          language: 6,
          condition: "NM",
          isFoil: 0,
          isSigned: 0,
          isPlayset: 0,
          isAltered: 1,
          comments: "+20cc",
          amount: 10,
          onSale: 0,
          idCurrency: 1,
          productLegalityId: 3,
          currencyCode: "EUR",
          idShop: 57,
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
