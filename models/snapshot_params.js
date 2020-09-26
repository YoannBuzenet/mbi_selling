"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class snapshot_params extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  snapshot_params.init(
    {
      shopId: DataTypes.INTEGER,
      percentPerSigned: DataTypes.INTEGER,
      percentPerMintRegular: DataTypes.INTEGER,
      percentPerNearMintRegular: DataTypes.INTEGER,
      percentPerGoodRegular: DataTypes.INTEGER,
      percentPerLightPlayedRegular: DataTypes.INTEGER,
      percentPerPlayedRegular: DataTypes.INTEGER,
      percentPerPoorRegular: DataTypes.INTEGER,
      percentPerMintFoil: DataTypes.INTEGER,
      percentPerNearMintFoil: DataTypes.INTEGER,
      percentPerGoodFoil: DataTypes.INTEGER,
      percentPerLightPlayedFoil: DataTypes.INTEGER,
      percentPerPlayedFoil: DataTypes.INTEGER,
      percentPerPoorFoil: DataTypes.INTEGER,
      percentPerLangGerman: DataTypes.INTEGER,
      percentPerLangSpanish: DataTypes.INTEGER,
      percentPerLangFrench: DataTypes.INTEGER,
      percentPerLangItalian: DataTypes.INTEGER,
      percentPerLangJapanese: DataTypes.INTEGER,
      percentPerLangPortuguese: DataTypes.INTEGER,
      percentPerLangRussian: DataTypes.INTEGER,
      percentPerLangSimplifiedChinese: DataTypes.INTEGER,
      percentPerLangEnglish: DataTypes.INTEGER,
      percentPerLangKorean: DataTypes.INTEGER,
      percentPerLangTraditionalChinese: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "snapshot_params",
    }
  );
  return snapshot_params;
};
