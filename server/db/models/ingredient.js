"use strict";
const {
  IngredientStatus,
  IngredientStatusValues,
} = require("../enums/ingredient-status");

module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define(
    "Ingredient",
    {
      name: {
        type: DataTypes.STRING(45),
        unique: true,
        allowNull: false,
        set(value) {
          this.setDataValue("name", value.toUpperCase());
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM(IngredientStatusValues),
        allowNull: false,
        defaultValue: IngredientStatus.PENDING.VALUE,
      },
      imageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
      },
    },
    {
      tableName: "Ingredients",
      timestamps: false,
    }
  );
  Ingredient.associate = function (models) {
    // associations can be defined here
    Ingredient.belongsToMany(models.Nutrient, {
      through: "IngredientNutrient",
      as: "nutrients",
    });

    Ingredient.belongsToMany(models.IngredientCategory, {
      through: "IngredientIngredientCategory",
      as: "ingredientCategories",
    });

    Ingredient.belongsToMany(models.Instruction, {
      through: "InstructionIngredient",
      as: "instructions",
    });

    Ingredient.belongsTo(models.FileData, {
      as: "image",
      foreignKey: "imageId",
    });
  };
  return Ingredient;
};
