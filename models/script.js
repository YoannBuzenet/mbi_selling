"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Script extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Script.hasMany(models.Custom_Rule);
      Script.belongsTo(models.User);
    }
  }
  Script.init(
    {
      idShop: DataTypes.INTEGER,
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Script",
    }
  );
  return Script;
};
