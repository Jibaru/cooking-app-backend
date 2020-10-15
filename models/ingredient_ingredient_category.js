'use strict';
module.exports = (sequelize, DataTypes) => {
  const IngredientIngredientCategory = sequelize.define('IngredientIngredientCategory', {
    ingredientId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ingredientCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    timestamps: false
  });
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