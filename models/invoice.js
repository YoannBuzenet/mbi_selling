"use strict";
const { arrayOf } = require("prop-types");
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
    static registerInvoiceAfterTransaction(
      idShop,
      idInvoice,
      userName,
      userAddress,
      userPostalCode,
      userTown,
      userVAT,
      lastProductBought,
      subscribingStartDate,
      subscribingEndDate,
      amountTaxIncluded,
      amountTaxExcluded,
      VATSum,
      VATStatus
    ) {
      return Invoice.create({
        idShop: idShop,
        idInvoice: idInvoice,
        userName: userName,
        userAddress: userAddress,
        userPostalCode: userPostalCode,
        userTown: userTown,
        userVAT: userVAT,
        productName: lastProductBought,
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
      const invoiceToUpdate = await Invoice.findOne({
        where: {
          subscribingStartDate: null,
          idShop: idShop,
        },
      });
      if (invoiceToUpdate) {
        return Invoice.upsert({
          id: invoiceToUpdate.dataValues.id,
          idInvoice: invoiceToUpdate.dataValues.idInvoice,
          userName: invoiceToUpdate.dataValues.userName,
          userAddress: invoiceToUpdate.dataValues.userAddress,
          userPostalCode: invoiceToUpdate.dataValues.userPostalCode,
          userTown: invoiceToUpdate.dataValues.userTown,
          userVAT: invoiceToUpdate.dataValues.userVAT,
          productName: invoiceToUpdate.dataValues.productName,
          subscribingStartDate: subscribingStartDate,
          subscribingEndDate: subscribingEndDate,
          amountTaxIncluded: invoiceToUpdate.dataValues.amountTaxIncluded,
          amountTaxExcluded: invoiceToUpdate.dataValues.amountTaxExcluded,
          VATSum: invoiceToUpdate.dataValues.VATSum,
          VATStatus: invoiceToUpdate.dataValues.VATStatus,
        });
      } else {
        console.error(
          "Error while trying to update an invoice : could not find it."
        );
      }
    }

    /* Law asks for a continuous id bewteen invoices, it is done with this function */
    static async getNextIdForInvoice() {
      const latestInvoice = await Invoice.findAll({
        limit: 1,
        order: [["createdAt", "DESC"]],
      });

      console.log("latestInvoice", latestInvoice);
      console.log("latestInvoice === null", latestInvoice === null);
      console.log(
        "Array.isArray(latestInvoice) && latestInvoice.length === 0",
        Array.isArray(latestInvoice) && latestInvoice.length === 0
      );
      console.log(
        "latestInvoice === null ||",
        Array.isArray(latestInvoice) && latestInvoice.length === 0
      );

      let nextId;
      // For first invoice
      if (
        latestInvoice === null ||
        (Array.isArray(latestInvoice) && latestInvoice.length === 0)
      ) {
        nextId = 1;
      } else {
        // Normal behaviour
        const lastInvoiceId = parseInt(latestInvoice[0].dataValues.idInvoice);
        nextId = lastInvoiceId + 1;
      }
      return nextId;
    }

    static getAllInvoicesForOneShop(idShop) {
      return Invoice.findAll({
        where: {
          idShop: idShop,
        },
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
        unique: true,
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userPostalCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userTown: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userVAT: {
        type: DataTypes.STRING,
      },
      productName: {
        //For now, an invoice can contain only one product. TODO next step : product table and N-N relation
        type: DataTypes.STRING,
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
