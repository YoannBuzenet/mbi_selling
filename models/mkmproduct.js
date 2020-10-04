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
    }
  }
  MkmProduct.init(
    {
      idArticle: { type: DataTypes.INTEGER, unique: true },
      idProduct: DataTypes.INTEGER,
      englishName: DataTypes.STRING,
      localName: DataTypes.STRING,
      Exp: DataTypes.STRING,
      expName: DataTypes.STRING,
      price: DataTypes.INTEGER,
      language: DataTypes.INTEGER,
      condition: DataTypes.STRING,
      isFoil: DataTypes.INTEGER,
      isSigned: DataTypes.INTEGER,
      isPlayset: DataTypes.INTEGER,
      isAltered: DataTypes.INTEGER,
      comments: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      onSale: DataTypes.INTEGER,
      idCurrency: DataTypes.INTEGER,
      currencyCode: DataTypes.STRING,
      idShop: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "MkmProduct",
    }
  );
  return MkmProduct;
};
