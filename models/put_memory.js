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
      put_memory.belongsTo(models.PUT_Request);
    }
  }
  put_memory.init(
    {
      idScript: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      idProduct: DataTypes.STRING,
      oldPrice: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      newPrice: {
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
      idCustomRuleUsed: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
    },
    {
      sequelize,
      modelName: "put_memory",
    }
  );
  return put_memory;
};
