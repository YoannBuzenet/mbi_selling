"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Custom_Rule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Custom_Rule.belongsTo(models.Script, { foreignKey: "id" });
      Custom_Rule.belongsTo(models.customRule_ruleType_definition, {
        foreignKey: "id",
      });
      Custom_Rule.belongsTo(models.customRule_behaviour_definition, {
        foreignKey: "id",
      });
      Custom_Rule.belongsTo(models.PriceGuideDefinitions, {
        foreignKey: "id",
      });
    }
  }
  Custom_Rule.init(
    {
      idScript: DataTypes.INTEGER,
      ruleTypeId: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      priceRangeFrom: {
        type: DataTypes.FLOAT,
        validate: { isNumeric: true },
      },
      priceRangeTo: {
        type: DataTypes.FLOAT,
        validate: { isNumeric: true },
      },
      priceRangeValueToSet: {
        type: DataTypes.FLOAT,
        validate: { isNumeric: true },
      },
      behaviourId: {
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
    },
    {
      sequelize,
      modelName: "Custom_Rule",
    }
  );
  return Custom_Rule;
};
