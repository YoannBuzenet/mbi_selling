"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.hasMany(models.OrderCards);
      Order.hasOne(models.Customer);
      Order.belongsTo(models.User);
    }
  }
  Order.init(
    {
      idOrderMKM: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
      wasMadeAt: DataTypes.DATE,
      idCustomerMKM: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
