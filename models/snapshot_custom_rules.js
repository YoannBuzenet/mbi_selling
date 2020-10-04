"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class snapshot_custom_rules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      snapshot_custom_rules.belongsTo(models.PUT_Request);
    }
  }
  snapshot_custom_rules.init(
    {
      idScript: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      ruleType: DataTypes.STRING,
      priceRangeFrom: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      priceRangeTo: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      priceRangeValueToSet: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      behaviour: DataTypes.STRING,
      priceRangePercentageFromMkm: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      isForFoils: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      isForSigned: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      isForPlaysets: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
    },
    {
      sequelize,
      modelName: "snapshot_custom_rules",
    }
  );
  return snapshot_custom_rules;
};
