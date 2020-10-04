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
      idOrderMKM: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      amount: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      wasMadeAt: DataTypes.DATE,
      idCustomerMKM: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
