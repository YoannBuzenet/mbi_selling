"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "MkmProducts",
      [
        {
          idArticle: 1767,
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
    return queryInterface.bulkDelete("MkmProducts", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
