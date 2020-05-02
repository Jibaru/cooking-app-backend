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
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    }
  }, {
    underscored: true,
    timestamps: false
  });
  Recipe.associate = function(models) {
    Recipe.hasMany(models.Step, {
      foreignKey: 'recipeId',
      as: 'steps'
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
  };
  return Recipe;
};