"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class snapshot_keyword extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      snapshot_keyword.belongsTo(models.PUT_Request, {
        foreignKey: "idPUT_Request",
      });
    }
  }
  snapshot_keyword.init(
    {
      idScript: DataTypes.INTEGER,
      name: DataTypes.STRING,
      PUT_Request_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "PUT_Requests",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "snapshot_keyword",
    }
  );
  return snapshot_keyword;
};
