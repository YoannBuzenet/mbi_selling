"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Custom_Rule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Custom_Rule.init(
    {
      idScript: DataTypes.INTEGER,
      ruleType: DataTypes.STRING,
      priceRangeFrom: DataTypes.INTEGER,
      priceRangeTo: DataTypes.INTEGER,
      priceRangeValueToSet: DataTypes.INTEGER,
      priceRangeIsUserValueToSet: DataTypes.INTEGER,
      priceRangePercentageFromMkm: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Custom_Rule",
    }
  );
  return Custom_Rule;
};
