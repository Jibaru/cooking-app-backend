"use strict";
module.exports = (sequelize, DataTypes) => {
  const IngredientRecipe = sequelize.define(
    "IngredientRecipe",
    {
      units: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      value: {
        type: DataTypes.DECIMAL(10, 4),
        allowNull: false,
      },
      recipeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ingredientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "IngredientRecipes",
      timestamps: false,
    }
  );
  IngredientRecipe.associate = function (models) {
    // associations can be defined here
    IngredientRecipe.belongsTo(models.Recipe, {
      foreignKey: "recipeId",
      as: "recipe",
    });
    IngredientRecipe.belongsTo(models.Ingredient, {
      foreignKey: "ingredientId",
      as: "ingredient",
    });
  };
  return IngredientRecipe;
};
