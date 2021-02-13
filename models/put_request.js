"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PUT_Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PUT_Request.hasMany(models.put_memory, {
        foreignKey: "PUT_Request_id",
      });
      PUT_Request.hasMany(models.snapshot_custom_rules, {
        foreignKey: "PUT_Request_id",
      });
      PUT_Request.hasMany(models.snapshot_rarity, {
        foreignKey: "PUT_Request_id",
      });
      PUT_Request.hasOne(models.snapshot_params, {
        foreignKey: "PUT_Request_id",
      });
      PUT_Request.hasOne(models.snapshot_keyword, {
        foreignKey: "PUT_Request_id",
      });
    }
    static markAsFinishedSuccessfully(id_put_request) {
      return PUT_Request.upsert({ id: id_put_request, isFinished: 1 });
    }

    static markAsFinishedWith0MKMProducts(id_put_request) {
      return PUT_Request.upsert({
        id: id_put_request,
        isFinished: 1,
        had0MKMProducts: 1,
      });
    }
    static getLastID() {
      return PUT_Request.findAll({
        limit: 1,
        order: [["createdAt", "DESC"]],
      });
    }
  }
  PUT_Request.init(
    {
      idShop: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      isReal: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
        allowNull: false,
      },
      isRewind: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
        defaultValue: 0,
      },
      isFinished: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
        defaultValue: 0,
      },
      had0MKMProducts: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
        defaultValue: 0,
      },
      hasPriceBasedOn: {
        type: DataTypes.STRING,
        validate: {
          isIn: {
            args: [["oldPrices", "mkmTrends"]],
            msg: "Value must be OldPrices or mkmTrends string.",
          },
        },
        defaultValue: "mkmTrends",
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
      eventualMKM_ErrorMessage: {
        type: DataTypes.STRING,
      },
      lastIterationNumberWhenMKM_ErrorHappened: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
    },
    {
      sequelize,
      modelName: "PUT_Request",
    }
  );
  return PUT_Request;
};
