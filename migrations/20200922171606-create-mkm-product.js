"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable("MkmProducts", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        idArticle: {
          type: Sequelize.INTEGER,
          unique: true,
          allowNull: false,
        },
        //Documentation purpose - Just another way to express a foreign key
        // idProduct: {
        //   type: Sequelize.INTEGER,
        //   allowNull: false,
        //   references: {
        //     model: "mkmproducts",
        //     key: "idProduct",
        //   },
        // },
        idProduct: {
          type: Sequelize.INTEGER,
        },
        englishName: {
          type: Sequelize.STRING,
        },
        localName: {
          type: Sequelize.STRING,
        },
        Exp: {
          type: Sequelize.STRING,
        },
        expName: {
          type: Sequelize.STRING,
        },
        price: {
          type: Sequelize.INTEGER,
        },
        language: {
          type: Sequelize.INTEGER,
        },
        condition: {
          type: Sequelize.STRING,
        },
        isFoil: {
          type: Sequelize.INTEGER,
        },
        isSigned: {
          type: Sequelize.INTEGER,
        },
        isPlayset: {
          type: Sequelize.INTEGER,
        },
        isAltered: {
          type: Sequelize.INTEGER,
        },
        comments: {
          type: Sequelize.STRING,
        },
        amount: {
          type: Sequelize.INTEGER,
        },
        onSale: {
          type: Sequelize.INTEGER,
        },
        idCurrency: {
          type: Sequelize.INTEGER,
        },
        currencyCode: {
          type: Sequelize.STRING,
        },
        idShop: {
          type: Sequelize.INTEGER,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() =>
        queryInterface.addIndex("mkmproducts", { fields: ["idProduct"] })
      );
    //Documentation purpose - Just another way to express a foreign key
    // .then(() =>
    //   queryInterface.addConstraint("LegalityProducts", {
    //     type: "FOREIGN KEY",
    //     fields: ["idLegality"],
    //     references: { field: "idLegality", table: "legalities" },
    //   })
    // )
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("MkmProducts");
  },
};
