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
      Script.hasMany(models.Keyword, { foreignKey: "idScript" });
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
    // Running these functions when creating a new shop, to give them pre made scripts
    static createCustomScript10PercentOnStandardFoil(scriptName, idShop) {
      return Script.create({
        idShop,
        willBeBasedOn: "oldPrices",
      });
    }
  }
  Script.init(
    {
      idShop: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isRunning: { type: DataTypes.INTEGER, defaultValue: 0 },
      willBeBasedOn: {
        type: DataTypes.STRING,
        defaultValue: "mkmTrends",
        validate: {
          isIn: {
            args: [["oldPrices", "mkmTrends"]],
            msg:
              "Value of willBeBasedOn prop must be OldPrices or mkmTrends string.",
          },
        },
      },
      keywordBehaviour: {
        type: DataTypes.STRING,
        defaultValue: "ignoresEverything",
        validate: {
          isIn: {
            args: [
              [
                "targetsSpecifically",
                "avoidsSpecifically",
                "ignoresEverything",
              ],
            ],
            msg:
              "Value of keyword Behaviour must be targetsSpecifically, avoidsSpecifically or ignoresEverything string.",
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
