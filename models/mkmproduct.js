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
      MkmProduct.belongsTo(models.User);
    }
  }
  MkmProduct.init(
    {
      idArticle: DataTypes.NUMBER,
      idProduct: { type: DataTypes.NUMBER, unique: true },
      englishName: DataTypes.STRING,
      localName: DataTypes.STRING,
      Exp: DataTypes.STRING,
      expName: DataTypes.STRING,
      price: DataTypes.NUMBER,
      language: DataTypes.NUMBER,
      condition: DataTypes.STRING,
      isFoil: DataTypes.NUMBER,
      isSigned: DataTypes.NUMBER,
      isPlayset: DataTypes.NUMBER,
      isAltered: DataTypes.NUMBER,
      comments: DataTypes.STRING,
      amount: DataTypes.NUMBER,
      onSale: DataTypes.NUMBER,
      idCurrency: DataTypes.NUMBER,
      currencyCode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "MkmProduct",
    }
  );
  return MkmProduct;
};
