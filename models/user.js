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
      User.hasMany(models.shop_params);
      User.hasMany(models.Script);
      User.hasMany(models.PUT_Request);
      User.hasMany(models.MkmProduct);
      User.hasMany(models.Order);
    }
    shop_params;
  }
  User.init(
    {
      idShop: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
