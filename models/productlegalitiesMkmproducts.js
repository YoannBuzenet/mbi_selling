"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductLegalitiesMkmProducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProductLegalitiesMkmProducts.init(
    {
      MkmProduct_id: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
        allowNull: false,
      },
      productLegalities_id: {
        type: DataTypes.INTEGER,
        validate: { isNumeric: true },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ProductLegalitiesMkmProducts",
    }
  );
  return ProductLegalitiesMkmProducts;
};
