"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class customRule_behaviour_definition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      customRule_behaviour_definition.hasMany(models.Custom_Rule, {
        foreignKey: "behaviourId",
      });
    }
  }
  customRule_behaviour_definition.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      sense: DataTypes.STRING,
      coefficient: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "customRule_behaviour_definition",
    }
  );
  return customRule_behaviour_definition;
};
