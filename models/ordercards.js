"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderCards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderCards.belongsTo(models.Order, { foreignKey: "idOrderMKM" });
    }
  }
  OrderCards.init(
    {
      amount: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      condition: DataTypes.STRING,
      lang: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      isFoil: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      isSigned: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      isAltered: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      isPlayset: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      idOrderMKM: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
    },
    {
      sequelize,
      modelName: "OrderCards",
    }
  );
  return OrderCards;
};
