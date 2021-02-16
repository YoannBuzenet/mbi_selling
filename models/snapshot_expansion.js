"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class snapshot_expansion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      snapshot_expansion.belongsTo(models.PUT_Request, {
        foreignKey: "PUT_Request_id",
      });
    }
  }
  snapshot_expansion.init(
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
      modelName: "snapshot_expansion",
    }
  );
  return snapshot_expansion;
};
