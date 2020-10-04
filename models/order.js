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
      Order.hasMany(models.OrderCards, { foreignKey: "idOrderMKM" });
      Order.hasOne(models.Customer, { foreignKey: "idCustomerMKM" });
      Order.belongsTo(models.User, { foreignKey: "idShop" });
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
