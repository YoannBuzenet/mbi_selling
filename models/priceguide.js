"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class priceguide extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  priceguide.init(
    {
      idProduct: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      AvgSellPrice: {
        type: DataTypes.FLOAT,
        validate: { isNumeric: true },
      },
      lowPrice: {
        type: DataTypes.FLOAT,
        validate: { isNumeric: true },
      },
      trendPrice: {
        type: DataTypes.FLOAT,
        validate: { isNumeric: true },
      },
      germanProLow: {
        type: DataTypes.FLOAT,
        validate: { isNumeric: true },
      },
      suggestedPrice: {
        type: DataTypes.FLOAT,
        validate: { isNumeric: true },
      },
      foilSell: {
        type: DataTypes.FLOAT,
        validate: { isNumeric: true },
      },
      foilLow: {
        type: DataTypes.FLOAT,
        validate: { isNumeric: true },
      },
      foilTrend: {
        type: DataTypes.FLOAT,
        validate: { isNumeric: true },
      },
      lowPriceEx: {
        type: DataTypes.FLOAT,
        validate: { isNumeric: true },
      },
      avg1: {
        type: DataTypes.FLOAT,
        validate: { isNumeric: true },
      },
      avg7: {
        type: DataTypes.FLOAT,
        validate: { isNumeric: true },
      },
      avg30: {
        type: DataTypes.FLOAT,
        validate: { isNumeric: true },
      },
      foilAvg1: {
        type: DataTypes.FLOAT,
        validate: { isNumeric: true },
      },
      foilAvg7: {
        type: DataTypes.FLOAT,
        validate: { isNumeric: true },
      },
      foilAvg30: {
        type: DataTypes.FLOAT,
        validate: { isNumeric: true },
      },
    },
    {
      sequelize,
      modelName: "priceguide",
    }
  );
  return priceguide;
};
