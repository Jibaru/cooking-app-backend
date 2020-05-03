'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: {
      type: DataTypes.STRING(126).BINARY,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    underscored: true,
    timestamps: false
  });
  Recipe.associate = function(models) {
    Recipe.hasMany(models.Step, {
      foreignKey: 'recipeId',
      as: 'steps'
    });
    Recipe.hasMany(models.Score, {
      foreignKey: 'recipeId',
      as: 'scores'
    });
    Recipe.belongsToMany(models.Ingredient, {
      through: 'IngredientRecipe',
      as: 'ingredients',
      foreignKey: 'recipeId',
      otherKey: 'ingredientId'
    });
    Recipe.belongsToMany(models.Tag, {
      through: 'RecipeTags',
      as: 'tags',
      foreignKey: 'recipeId',
      otherKey: 'tagId'
    });
    Recipe.belongsToMany(models.User, {
      through: 'Favorite',
      as: 'favoriteUsers',
      foreignKey: 'recipeId',
      otherKey: 'userId'
    });
  };
  return Recipe;
};