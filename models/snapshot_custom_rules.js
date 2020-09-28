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
      idScript: DataTypes.INTEGER,
      ruleType: DataTypes.STRING,
      priceRangeFrom: DataTypes.INTEGER,
      priceRangeTo: DataTypes.INTEGER,
      priceRangeValueToSet: DataTypes.INTEGER,
      behaviour: DataTypes.STRING,
      priceRangePercentageFromMkm: DataTypes.INTEGER,
      isForFoils: DataTypes.INTEGER,
      isForSigned: DataTypes.INTEGER,
      isForPlaysets: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "snapshot_custom_rules",
    }
  );
  return snapshot_custom_rules;
};
