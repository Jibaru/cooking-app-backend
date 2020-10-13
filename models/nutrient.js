'use strict';
module.exports = (sequelize, DataTypes) => {
  const Nutrient = sequelize.define('Nutrient', {
    name: DataTypes.STRING
  }, {});
  Nutrient.associate = function(models) {
    // associations can be defined here
  };
  return Nutrient;
};