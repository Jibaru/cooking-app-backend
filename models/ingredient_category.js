'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ingredient_Category = sequelize.define('Ingredient_Category', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Ingredient_Category.associate = function(models) {
    // associations can be defined here
  };
  return Ingredient_Category;
};