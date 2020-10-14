'use strict';
module.exports = (sequelize, DataTypes) => {
  const IngredientIngredientCategory = sequelize.define('IngredientIngredientCategory', {
    ingredientId: DataTypes.INTEGER,
    ingredientCategoryId: DataTypes.INTEGER
  }, {});
  IngredientIngredientCategory.associate = function(models) {
    // associations can be defined here
    IngredientIngredientCategory.belongsTo(models.IngredientCategory, {
      foreignKey: 'ingredientCategoryId',
      as: 'ingredientCategory'
    });
    IngredientIngredientCategory.belongsTo(models.Ingredient, {
      foreignKey: 'ingredientId',
      as: 'ingredient'
    });
  };
  return IngredientIngredientCategory;
};