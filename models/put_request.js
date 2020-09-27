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
    }
  }
  PUT_Request.init(
    {
      shopId: DataTypes.INTEGER,
      batchId: DataTypes.INTEGER,
      snapShotParamId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PUT_Request",
    }
  );
  return PUT_Request;
};
