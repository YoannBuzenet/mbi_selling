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
    static registerInvoiceFromTransaction(
      idShop,
      subscribingStartDate,
      subscribingEndDate,
      amountTaxIncluded,
      amountTaxExcluded,
      VATSum,
      VATStatus
    ) {
      return Invoice.create({
        idShop: idShop,
        idInvoice: 1,
        subscribingStartDate: subscribingStartDate,
        subscribingEndDate: subscribingEndDate,
        amountTaxIncluded: amountTaxIncluded,
        amountTaxExcluded: amountTaxExcluded,
        VATSum: VATSum,
        VATStatus: VATStatus,
      });
    }

    static async updateInvoiceFromCustomer(
      idShop,
      subscribingStartDate,
      subscribingEndDate
    ) {
      const invoiceToUpdate = await db.Invoice.findOne({
        where: {
          subscribingStartDate: null,
          idShop: idShop,
        },
      });
      return invoiceToUpdate.upsert({
        subscribingStartDate: subscribingStartDate,
        subscribingEndDate: subscribingEndDate,
      });
    }

    static async getNextIdForInvoice() {
      const latestInvoice = await Invoice.findAll({
        limit: 1,
        order: [["createdAt", "DESC"]],
      });

      const lastInvoiceId = parseInt(latestInvoice.davaValues.idInvoice);
      const nextId = lastInvoiceId + 1;
      return nextId;
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
        unique: true,
        allowNull: false,
      },
      subscribingStartDate: {
        type: DataTypes.DATEONLY,
      },
      subscribingEndDate: {
        type: DataTypes.DATEONLY,
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
