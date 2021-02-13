"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rarity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rarity.belongsTo(models.Script, { foreignKey: "idScript" });
    }
  }
  Rarity.init(
    { idScript: DataTypes.INTEGER, name: DataTypes.STRING },
    {
      sequelize,
      modelName: "Rarity",
    }
  );
  return Rarity;
};
