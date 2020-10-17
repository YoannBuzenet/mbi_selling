"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ScriptsFormats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ScriptsFormats.init(
    {
      format_id: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
        allowNull: false,
      },
      script_id: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ScriptsFormats",
    }
  );
  return ScriptsFormats;
};
