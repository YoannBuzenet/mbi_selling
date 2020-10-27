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
      productLegalities.hasMany(models.MkmProduct, {
        foreignKey: "idProduct",
      });
    }
  }
  productLegalities.init(
    {
      idProduct: { type: DataTypes.INTEGER, unique: true },
      idSet: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      isLegalCommander: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      isLegalDuel: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      isLegalLegacy: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      isLegalModern: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      isLegalVintage: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      isLegalPenny: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      isLegalPauper: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      isLegalHistoric: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      isLegalPioneer: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      isLegalBrawl: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      isLegalFuture: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      isLegalStandard: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      isLegalOldSchool: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
    },
    {
      sequelize,
      modelName: "productLegalities",
    }
  );
  return productLegalities;
};
