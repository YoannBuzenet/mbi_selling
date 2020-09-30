"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class productLegalities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  productLegalities.init(
    {
      idProduct: { type: DataTypes.INTEGER, unique: true },
      isLegalCommander: DataTypes.INTEGER,
      isLegalDuel: DataTypes.INTEGER,
      isLegalLegacy: DataTypes.INTEGER,
      isLegalModern: DataTypes.INTEGER,
      isLegalVintage: DataTypes.INTEGER,
      isLegalPenny: DataTypes.INTEGER,
      isLegalPauper: DataTypes.INTEGER,
      isLegalHistoric: DataTypes.INTEGER,
      isLegalPioneer: DataTypes.INTEGER,
      isLegalBrawl: DataTypes.INTEGER,
      isLegalFuture: DataTypes.INTEGER,
      isLegalStandard: DataTypes.INTEGER,
      isLegalOldSchool: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "productLegalities",
    }
  );
  return productLegalities;
};
