"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Expansion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Expansion.belongsTo(models.Script, { foreignKey: "idScript" });
    }
  }
  Expansion.init(
    { idScript: DataTypes.INTEGER, name: DataTypes.STRING },
    {
      sequelize,
      modelName: "Expansion",
    }
  );
  return Expansion;
};
