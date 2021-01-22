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
    static async passStockAsShouldBeRefreshed(idUser) {
      const userToUpdate = await User.findOne({
        where: {
          id: idUser,
        },
      });
      if (userToUpdate) {
        return Invoice.upsert({
          id: idUser.dataValues.id,
          isSubscribedUntil: idUser.dataValues.isSubscribedUntil,
          temporarySecret: idUser.dataValues.temporarySecret,
          temporaryLastProductPaid: idUser.dataValues.temporaryLastProductPaid,
          shouldHaveStockDataRefreshed: 1,
        });
      } else {
        console.error(
          "Error while trying to update an user : could not find it."
        );
      }
    }
    static async removeStockAsShouldBeRefreshed(idUser) {
      const userToUpdate = await User.findOne({
        where: {
          id: idUser,
        },
      });
      if (userToUpdate) {
        return Invoice.upsert({
          id: idUser.dataValues.id,
          isSubscribedUntil: idUser.dataValues.isSubscribedUntil,
          temporarySecret: idUser.dataValues.temporarySecret,
          temporaryLastProductPaid: idUser.dataValues.temporaryLastProductPaid,
          shouldHaveStockDataRefreshed: 0,
        });
      } else {
        console.error(
          "Error while trying to update an user : could not find it."
        );
      }
    }
  }
  User.init(
    {
      idShop: {
        type: DataTypes.INTEGER,
        unique: true,
        validate: { isNumeric: true },
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
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
