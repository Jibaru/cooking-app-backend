'use strict';
module.exports = (sequelize, DataTypes) => {
  const IngredientIngredientCategory = sequelize.define('IngredientIngredientCategory', {
    ingredientId: DataTypes.INTEGER,
    ingredientCategoryId: DataTypes.INTEGER
  }, {});
  IngredientIngredientCategory.associate = function(models) {
    // associations can be defined here
  };
  return IngredientIngredientCategory;
};