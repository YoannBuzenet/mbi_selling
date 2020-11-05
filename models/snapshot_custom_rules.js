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
      snapshot_custom_rules.belongsTo(models.PUT_Request, {
        foreignKey: "PUT_Request_id",
      });
    }
  }
  snapshot_custom_rules.init(
    {
      idScript: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      ruleTypeId: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
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
      behaviourId: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
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
      mkmPriceGuideReference: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
        defaultValue: 1,
      },
      PUT_Request_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "PUT_Request",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "snapshot_custom_rules",
    }
  );
  return snapshot_custom_rules;
};
