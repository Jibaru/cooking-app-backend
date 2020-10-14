'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeRecipeTag = sequelize.define('RecipeRecipeTag', {
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeTagId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  RecipeRecipeTag.associate = function(models) {
    // associations can be defined here
  };
  return RecipeRecipeTag;
};