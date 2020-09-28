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
      idScript: DataTypes.INTEGER,
      idProduct: DataTypes.STRING,
      oldPrice: DataTypes.INTEGER,
      newPrice: DataTypes.INTEGER,
      condition: DataTypes.INTEGER,
      lang: DataTypes.INTEGER,
      isFoil: DataTypes.INTEGER,
      isSigned: DataTypes.INTEGER,
      isPlayset: DataTypes.INTEGER,
      idCustomRuleUsed: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "put_memory",
    }
  );
  return put_memory;
};
