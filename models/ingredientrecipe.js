'use strict';
module.exports = (sequelize, DataTypes) => {
  const IngredientRecipe = sequelize.define('IngredientRecipe', {
    ingredientId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    tableName: 'IngredientRecipes',
    underscored: true,
    timestamps: false
  });
  IngredientRecipe.associate = function(models) {
    // associations can be defined here
  };
  return IngredientRecipe;
};