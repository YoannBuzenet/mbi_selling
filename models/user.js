"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.shop_params, { foreignKey: "idShop" });
      User.hasMany(models.Script, { foreignKey: "idShop" });
      User.hasMany(models.PUT_Request, { foreignKey: "idShop" });
      User.hasMany(models.MkmProduct, { foreignKey: "idShop" });
      User.hasMany(models.Order, { foreignKey: "idShop" });
      User.hasMany(models.Invoice, { foreignKey: "idShop" });
    }
  }
  User.init(
    {
      idShop: { type: DataTypes.INTEGER, unique: true },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
