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
      Script.hasMany(models.Rarity, { foreignKey: "idScript" });
      Script.belongsTo(models.User, { foreignKey: "idShop" });
      Script.belongsToMany(models.Format, {
        through: models.ScriptsFormats,
        foreignKey: "script_id",
      });
    }

    static markAsRunning(idScript) {
      return Script.findOne({
        where: {
          id: idScript,
        },
      }).then((script) =>
        Script.upsert(
          {
            id: script.dataValues.id,
            isRunning: 1,
            name: script.dataValues.name,
            willBeBasedOn: script.dataValues.willBeBasedOn,
            keywordBehaviour: script.dataValues.keywordBehaviour,
          },
          { fields: ["isRunning"] }
        )
      );
    }

    static markAsNotRunning(idScript) {
      return Script.findOne({
        where: {
          id: idScript,
        },
      }).then((script) =>
        Script.upsert(
          {
            id: script.dataValues.id,
            isRunning: 0,
            name: script.dataValues.name,
            willBeBasedOn: script.dataValues.willBeBasedOn,
            keywordBehaviour: script.dataValues.keywordBehaviour,
          },
          { fields: ["isRunning"] }
        )
      );
    }
    // Running these functions when creating a new shop, to give them pre made scripts
    static createCustomScript(
      scriptName,
      idShop,
      pricedBasedOn,
      keywordbehaviour = "ignoresEverything"
    ) {
      return Script.create({
        name: scriptName,
        idShop,
        willBeBasedOn: pricedBasedOn,
        keywordBehaviour: keywordbehaviour,
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
