'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('Ingredient', {
    name: {
      type: DataTypes.STRING(126).BINARY,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(126).BINARY,
      allowNull: true,
      defaultValue: null
    }
  }, {
    underscored: true,
    timestamps: false
  });
  Ingredient.associate = function(models) {
    Ingredient.belongsToMany(models.Recipe, {
      through: 'IngredientRecipe',
      as: 'recipes',
      foreignKey: 'ingredientId',
      otherKey: 'recipeId'
    });
  };
  return Ingredient;
};