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
      OrderCards.belongsTo(models.Order);
    }
  }
  OrderCards.init(
    {
      amount: DataTypes.INTEGER,
      condition: DataTypes.STRING,
      lang: DataTypes.INTEGER,
      isFoil: DataTypes.INTEGER,
      isSigned: DataTypes.INTEGER,
      isAltered: DataTypes.INTEGER,
      isPlayset: DataTypes.INTEGER,
      idOrder: DataTypes.INTEGER, //TODO check si les relations s'écrivent comme ça
    },
    {
      sequelize,
      modelName: "OrderCards",
    }
  );
  return OrderCards;
};
