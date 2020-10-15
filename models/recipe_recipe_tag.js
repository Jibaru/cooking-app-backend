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
  }, {
    timestamps: false
  });
  RecipeRecipeTag.associate = function(models) {
    // associations can be defined here
    RecipeRecipeTag.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      as: 'recipe'
    });
    RecipeRecipeTag.belongsTo(models.RecipeTag, {
      foreignKey: 'recipeTagId',
      as: 'recipeTag'
    });
  };
  return RecipeRecipeTag;
};