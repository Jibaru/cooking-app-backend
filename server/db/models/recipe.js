"use strict";
const { RecipeStatus, RecipeStatusValues } = require("../enums/recipe-status");

module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define(
    "Recipe",
    {
      dateTimePublished: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      title: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      yield: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      prepTime: {
        type: DataTypes.BIGINT, // Milliseconds time
        allowNull: false,
      },
      cookTime: {
        type: DataTypes.BIGINT, // Milliseconds time
        allowNull: false,
      },
      totalTime: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.prepTime + this.cookTime;
        },
      },
      status: {
        type: DataTypes.ENUM(RecipeStatusValues),
        allowNull: false,
        defaultValue: RecipeStatus.PENDING.VALUE,
      },
      recipeImageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      instructionId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      createdById: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      recipeCuisineId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      recipeTypeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "Recipes",
      timestamps: false,
    }
  );
  Recipe.associate = function (models) {
    // associations can be defined here

    Recipe.belongsTo(models.FileData, {
      as: "recipeImage",
      foreignKey: "recipeImageId",
    });

    Recipe.belongsTo(models.Instruction, {
      as: "instruction",
      foreignKey: "instructionId",
    });

    Recipe.belongsTo(models.User, {
      as: "createdBy",
      foreignKey: "createdById",
    });

    Recipe.belongsTo(models.RecipeCuisine, {
      as: "recipeCuisine",
      foreignKey: "recipeCuisineId",
    });

    Recipe.belongsTo(models.RecipeType, {
      as: "recipeType",
      foreignKey: "recipeTypeId",
    });

    Recipe.belongsToMany(models.RecipeTag, {
      through: "RecipeRecipeTag",
      as: "recipeTag",
    });

    Recipe.belongsToMany(models.User, {
      through: "RecipeStore",
      as: "storeUsers",
    });

    Recipe.belongsToMany(models.User, {
      through: "RecipeFavorite",
      as: "favoriteUsers",
    });

    Recipe.belongsToMany(models.User, {
      through: "RecipeRanking",
      as: "rankingUsers",
    });
  };
  return Recipe;
};
