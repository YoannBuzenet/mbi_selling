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
      PUT_Request.hasOne(models.snapshot_params, {
        foreignKey: "PUT_Request_id",
      });
    }
  }
  PUT_Request.init(
    {
      idShop: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      // isReal: {
      //   type: DataTypes.INTEGER,
      //   validate: { isNumeric: true },
      // },
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
