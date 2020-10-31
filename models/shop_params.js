"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class shop_params extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      shop_params.belongsTo(models.User, { foreignKey: "idShop" });
    }
  }
  shop_params.init(
    {
      idShop: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      percentPerSigned: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      percentPerMintRegular: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      percentPerNearMintRegular: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      percentPerExcellentRegular: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      percentPerGoodRegular: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      percentPerLightPlayedRegular: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      percentPerPlayedRegular: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      percentPerPoorRegular: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      percentPerMintFoil: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      percentPerNearMintFoil: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      percentPerExcellentFoil: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      percentPerGoodFoil: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      percentPerLightPlayedFoil: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      percentPerPlayedFoil: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      percentPerPoorFoil: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      percentPerLangGerman: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      percentPerLangSpanish: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      percentPerLangFrench: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      percentPerLangItalian: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      percentPerLangJapanese: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      percentPerLangPortuguese: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      percentPerLangRussian: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      percentPerLangSimplifiedChinese: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      percentPerLangEnglish: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      percentPerLangKorean: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      percentPerLangTraditionalChinese: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
    },
    {
      sequelize,
      modelName: "shop_params",
    }
  );
  return shop_params;
};
