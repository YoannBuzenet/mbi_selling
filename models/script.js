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
      Script.hasMany(models.Custom_Rule, { foreignKey: "id" });
      Script.belongsTo(models.User, { foreignKey: "idShop" });
    }
  }
  Script.init(
    {
      idShop: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
        allowNull: false,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Script",
    }
  );
  return Script;
};
