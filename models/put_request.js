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
      PUT_Request.hasMany(models.put_memory);
      PUT_Request.hasMany(models.snapshot_custom_rules);
      PUT_Request.hasOne(models.snapshot_params);
    }
  }
  PUT_Request.init(
    {
      shopId: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      // batchId: {
      //   type: DataTypes.INTEGER,
      //   validate: { isNumeric: true },
      // },
      snapShotParamId: {
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
