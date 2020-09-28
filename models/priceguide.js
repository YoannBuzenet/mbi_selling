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
      idProduct: DataTypes.INTEGER,
      AvgSellPrice: DataTypes.INTEGER,
      lowPrice: DataTypes.INTEGER,
      trendPrice: DataTypes.INTEGER,
      germanProLow: DataTypes.INTEGER,
      suggestedPrice: DataTypes.INTEGER,
      foilSell: DataTypes.INTEGER,
      foilLow: DataTypes.INTEGER,
      foilTrend: DataTypes.INTEGER,
      lowPriceEx: DataTypes.INTEGER,
      avg1: DataTypes.INTEGER,
      avg7: DataTypes.INTEGER,
      avg30: DataTypes.INTEGER,
      foilAvg1: DataTypes.INTEGER,
      foilAvg7: DataTypes.INTEGER,
      foilAvg30: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "priceguide",
    }
  );
  return priceguide;
};
