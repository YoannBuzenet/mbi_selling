"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class put_memory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      put_memory.belongsTo(models.PUT_Request, {
        foreignKey: "PUT_Request_id",
      });
    }
  }
  put_memory.init(
    {
      idScript: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      idProduct: DataTypes.INTEGER,
      idArticle: DataTypes.INTEGER,
      cardName: { type: DataTypes.STRING },
      regularCardsTrend: {
        type: DataTypes.FLOAT,
        validate: { isNumeric: true },
      },
      foilCardsTrend: {
        type: DataTypes.FLOAT,
        validate: { isNumeric: true },
      },
      oldPrice: {
        type: DataTypes.FLOAT,
        validate: { isNumeric: true },
      },
      newPrice: {
        type: DataTypes.FLOAT,
        validate: { isNumeric: true },
      },
      numberUserChoseToUse: {
        type: DataTypes.FLOAT,
        validate: { isNumeric: true },
      },
      priceShieldBlocked: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      priceShieldReason: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      condition: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
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
      isPlayset: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      amout: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      behaviourChosen: {
        type: DataTypes.STRING,
      },
      idCustomRuleUsed: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      PUT_Request_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "PUT_Request",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "put_memory",
    }
  );
  return put_memory;
};
