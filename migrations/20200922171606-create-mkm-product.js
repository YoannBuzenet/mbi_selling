"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("MkmProducts", {
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
        allowNull: false,
        references: {
          model: "productlegalities",
          key: "idProduct",
        },
      },
      productLegalityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "productlegalities",
          key: "id",
        },
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
        type: Sequelize.FLOAT,
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
    });
    // .then(() =>
    // adding index
    //   queryInterface.addIndex("mkmproducts", { fields: ["idProduct"] })
    // );
    //Documentation purpose - Just another way to express a foreign key
    // .then(() =>
    //   queryInterface.addConstraint("productLegalities", {
    //     type: "FOREIGN KEY",
    //     fields: ["productLegalities_id"],
    //     references: { field: "id", table: "productLegalities" },
    //   })
    // );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("MkmProducts");
  },
};
