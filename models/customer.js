"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.belongsTo(models.Order, { foreignKey: "idCustomerMKM" });
    }
  }
  Customer.init(
    {
      country: DataTypes.STRING,
      idShop: DataTypes.INTEGER,
      idCustomerMKM: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};
