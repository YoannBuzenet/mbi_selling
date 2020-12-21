"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invoice.belongsTo(models.User, { foreignKey: "idShop" });
    }
    static registerInvoiceFromTransaction(idShop) {
      return Invoice.create({
        //prop : value
        idShop,
        subscribingStartDate: "",
        subscribingEndDate: "",
        amountTaxIncluded: "",
        amountTaxExcluded: "",
        VATSum: "",
        VATStatus: "",
      });
    }
  }
  Invoice.init(
    {
      idShop: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
      },
      idInvoice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subscribingStartDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      subscribingEndDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      amountTaxIncluded: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      amountTaxExcluded: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      VATSum: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      VATStatus: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Invoice",
    }
  );
  return Invoice;
};
