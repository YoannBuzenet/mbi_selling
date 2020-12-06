"use strict";

const { Model } = require("sequelize");
const {
  transformConditionStringIntoInteger,
} = require("../server/controllers/genericDataController");

module.exports = (sequelize, DataTypes) => {
  class put_memory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      put_memory.belongsTo(models.PUT_Request, {
        foreignKey: "PUT_Request_id",
      });
    }
    static registerAsFailure(
      idScript,
      card,
      idSnapShotCustomRule,
      idPut_request
    ) {
      return put_memory.create({
        idScript: idScript,
        idProduct: card.idProduct,
        idArticle: card.idArticle,
        cardName: card.englishName,
        regularCardsTrend: card.isFoil === 0 ? card.relevantTrend : null,
        foilCardsTrend: card.isFoil === 0 ? null : card.relevantTrend,
        priceShieldBlocked: 0,
        oldPrice: card.price,
        newPrice: card.price,
        condition: transformConditionStringIntoInteger(card.condition),
        lang: card.language,
        isFoil: card.isFoil,
        isSigned: card.isSigned,
        isPlayset: 0,
        amount: card.amount,
        behaviourChosen: "MKM Error",
        idCustomRuleUsed: idSnapShotCustomRule,
        PUT_Request_id: idPut_request,
      });
    }
    static registerAsFailureREWIND(idScript, card, idPut_request) {
      return put_memory.create({
        idScript: idScript,
        idProduct: card.idProduct,
        idArticle: card.idArticle,
        cardName: card.englishName,
        regularCardsTrend: null,
        foilCardsTrend: null,
        priceShieldBlocked: 0,
        oldPrice: card.oldPrice,
        newPrice: card.oldPrice,
        condition: card.condition, //Already an integer because coming from our DB
        lang: card.language,
        isFoil: card.isFoil,
        isSigned: card.isSigned,
        isPlayset: 0,
        amount: card.amount,
        behaviourChosen: "MKM Error",
        idCustomRuleUsed: null,
        PUT_Request_id: idPut_request,
      });
    }

    static registerAsSuccess(
      idScript,
      card,
      idSnapShotCustomRule,
      idPut_request,
      behaviourChosen
    ) {
      return put_memory.create({
        idScript: idScript,
        idProduct: card.idProduct,
        idArticle: card.idArticle,
        cardName: card.englishName,
        regularCardsTrend: card.isFoil === 0 ? card.relevantTrend : null,
        foilCardsTrend: card.isFoil === 0 ? null : card.relevantTrend,
        priceShieldBlocked: 0,
        oldPrice: card.price,
        newPrice: card.newPrice,
        condition: transformConditionStringIntoInteger(card.condition),
        lang: card.language,
        isFoil: card.isFoil,
        isSigned: card.isSigned,
        isPlayset: 0,
        amount: card.amount,
        behaviourChosen: behaviourChosen,
        idCustomRuleUsed: idSnapShotCustomRule,
        PUT_Request_id: idPut_request,
      });
    }
    static registerAsSuccessREWIND(idScript, card, idPut_request) {
      return put_memory.create({
        idScript: idScript,
        idProduct: card.idProduct,
        idArticle: card.idArticle,
        cardName: card.englishName,
        regularCardsTrend: null,
        foilCardsTrend: null,
        priceShieldBlocked: 0,
        oldPrice: card.oldPrice,
        newPrice: card.oldPrice,
        condition: card.condition, //Already an integer because coming from our DB
        lang: card.language,
        isFoil: card.isFoil,
        isSigned: card.isSigned,
        isPlayset: 0,
        amount: card.amount,
        behaviourChosen: "Rewind",
        idCustomRuleUsed: null,
        PUT_Request_id: idPut_request,
      });
    }

    static registerAsSkippedCard(
      idScript,
      card,
      idSnapShotCustomRule,
      idPut_request,
      behaviourChosen
    ) {
      return put_memory.create({
        idScript: idScript,
        idProduct: card.idProduct,
        idArticle: card.idArticle,
        cardName: card.englishName,
        regularCardsTrend: card.isFoil === 0 ? card.relevantTrend : null,
        foilCardsTrend: card.isFoil === 0 ? null : card.relevantTrend,
        priceShieldBlocked: card.hasOwnProperty("priceShieldBlocked") ? 1 : 0,
        priceShieldReason: card.priceShieldReason,
        oldPrice: card.price,
        newPrice: card.newPrice,
        condition: transformConditionStringIntoInteger(card.condition),
        lang: card.language,
        isFoil: card.isFoil,
        isSigned: card.isSigned,
        isPlayset: 0,
        amount: card.amount,
        behaviourChosen: behaviourChosen,
        idCustomRuleUsed: idSnapShotCustomRule,
        PUT_Request_id: idPut_request,
      });
    }
  }
  put_memory.init(
    {
      idScript: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      idProduct: DataTypes.INTEGER,
      idArticle: DataTypes.INTEGER,
      cardName: { type: DataTypes.STRING },
      regularCardsTrend: {
        type: DataTypes.FLOAT,
        validate: { isNumeric: true },
      },
      foilCardsTrend: {
        type: DataTypes.FLOAT,
        validate: { isNumeric: true },
      },
      oldPrice: {
        type: DataTypes.FLOAT,
        validate: { isNumeric: true },
      },
      newPrice: {
        type: DataTypes.FLOAT,
        validate: { isNumeric: true },
      },
      numberUserChoseToUse: {
        type: DataTypes.FLOAT,
        validate: { isNumeric: true },
      },
      priceShieldBlocked: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
        allowNull: false,
      },
      priceShieldReason: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      condition: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      lang: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      isFoil: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      isSigned: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      isPlayset: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      amout: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      behaviourChosen: {
        type: DataTypes.STRING,
      },
      idCustomRuleUsed: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
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
      modelName: "put_memory",
    }
  );
  return put_memory;
};
