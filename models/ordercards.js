'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderCards extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  OrderCards.init({
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderCards',
  });
  return OrderCards;
};