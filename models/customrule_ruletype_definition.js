'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customRule_ruleType_definition extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  customRule_ruleType_definition.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'customRule_ruleType_definition',
  });
  return customRule_ruleType_definition;
};