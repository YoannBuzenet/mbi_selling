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
      AvgSellPrice: DataTypes.DECIMAL,
      lowPrice: DataTypes.DECIMAL,
      trendPrice: DataTypes.DECIMAL,
      germanProLow: DataTypes.DECIMAL,
      suggestedPrice: DataTypes.DECIMAL,
      foilSell: DataTypes.DECIMAL,
      foilLow: DataTypes.DECIMAL,
      foilTrend: DataTypes.DECIMAL,
      lowPriceEx: DataTypes.DECIMAL,
      avg1: DataTypes.DECIMAL,
      avg7: DataTypes.DECIMAL,
      avg30: DataTypes.DECIMAL,
      foilAvg1: DataTypes.DECIMAL,
      foilAvg7: DataTypes.DECIMAL,
      foilAvg30: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "priceguide",
    }
  );
  return priceguide;
};
