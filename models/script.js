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
      Script.hasMany(models.Keyword, { foreignKey: "id" });
      Script.belongsTo(models.User, { foreignKey: "idShop" });
      Script.belongsToMany(models.Format, {
        through: models.ScriptsFormats,
        foreignKey: "script_id",
      });
    }
    static markAsRunning(idScript) {
      return Script.upsert({ id: idScript, isRunning: 1 });
    }
    static markAsNotRunning(idScript) {
      return Script.upsert({ id: idScript, isRunning: 0 });
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
      isRunning: { type: DataTypes.INTEGER, defaultValue: 0 },
      willBeBasedOn: {
        type: DataTypes.STRING,
        defaultValue: "mkmTrends",
        validate: {
          isIn: {
            args: [["oldPrices", "mkmTrends"]],
            msg: "Value must be OldPrices or mkmTrends string.",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Script",
    }
  );
  return Script;
};
