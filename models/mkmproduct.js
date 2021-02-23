"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MkmProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MkmProduct.belongsTo(models.User, { foreignKey: "idShop" });
      MkmProduct.belongsTo(models.productLegalities);
    }
  }
  MkmProduct.init(
    {
      idArticle: {
        type: DataTypes.INTEGER,
        unique: true,
        validate: { isNumeric: true },
      },
      idProduct: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      productLegalityId: {
        type: DataTypes.INTEGER,
      },
      englishName: DataTypes.STRING,
      localName: DataTypes.STRING,
      Exp: DataTypes.STRING,
      expName: DataTypes.STRING,
      price: {
        type: DataTypes.FLOAT,
        validate: { isNumeric: true },
      },
      language: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      condition: DataTypes.STRING,
      isFoil: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      isSigned: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      isPlayset: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      isAltered: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      comments: DataTypes.STRING,
      amount: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      onSale: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      idCurrency: {
        type: DataTypes.INTEGER,
      },
      currencyCode: DataTypes.STRING,
      idShop: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
    },
    {
      sequelize,
      modelName: "MkmProduct",
    }
  );
  return MkmProduct;
};
