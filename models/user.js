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
    static async passStockAsShouldBeRefreshed(idShop) {
      const userToUpdate = await User.findOne({
        where: {
          idShop: idShop,
        },
      });
      if (userToUpdate !== null) {
        return User.upsert({
          id: userToUpdate.dataValues.id,
          email: userToUpdate.dataValues.email,
          shopKey: userToUpdate.dataValues.shopKey,
          isSubscribedUntil: userToUpdate.dataValues.isSubscribedUntil,
          temporarySecret: userToUpdate.dataValues.temporarySecret,
          temporaryLastProductPaid:
            userToUpdate.dataValues.temporaryLastProductPaid,
          shouldHaveStockDataRefreshed: 1,
          hasAlreadyConnected: userToUpdate.dataValues.hasAlreadyConnected,
        });
      } else {
        console.error(
          "Error while trying to update an user : could not find it. iShop :",
          idShop
        );
      }
    }
    static async removeStockAsShouldBeRefreshed(idUser) {
      const userToUpdate = await User.findOne({
        where: {
          id: idUser,
        },
      });
      if (userToUpdate !== null) {
        return User.upsert({
          id: idUser,
          email: userToUpdate.dataValues.email,
          shopKey: userToUpdate.dataValues.shopKey,
          isSubscribedUntil: userToUpdate.dataValues.isSubscribedUntil,
          temporarySecret: userToUpdate.dataValues.temporarySecret,
          temporaryLastProductPaid:
            userToUpdate.dataValues.temporaryLastProductPaid,
          shouldHaveStockDataRefreshed: 0,
          hasAlreadyConnected: userToUpdate.dataValues.hasAlreadyConnected,
        });
      } else {
        console.error(
          "Error while trying to update an user and remove stock should be refreshed: could not find it."
        );
      }
    }
    static async markAsHasConnected(user) {
      return User.upsert({
        id: user.dataValues.id,
        email: user.dataValues.email,
        shopKey: user.dataValues.shopKey,
        isSubscribedUntil: user.dataValues.isSubscribedUntil,
        temporarySecret: user.dataValues.temporarySecret,
        temporaryLastProductPaid: user.dataValues.temporaryLastProductPaid,
        shouldHaveStockDataRefreshed:
          user.dataValues.shouldHaveStockDataRefreshed,
        hasAlreadyConnected: 1,
      });
    }
  }
  User.init(
    {
      idShop: {
        type: DataTypes.INTEGER,
        unique: true,
        validate: { isNumeric: true },
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      shopKey: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      isSubscribedUntil: {
        type: DataTypes.DATEONLY,
      },
      temporarySecret: {
        type: DataTypes.STRING,
      },
      temporaryLastProductPaid: {
        type: DataTypes.STRING,
      },
      shouldHaveStockDataRefreshed: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      hasAlreadyConnected: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
