'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('Ingredient', {
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imageId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {});
  Ingredient.associate = function(models) {
    // associations can be defined here
    Ingredient.belongsToMany(models.Nutrient, {
      through: 'IngredientNutrient',
      as: 'nutrient'
    });

    Ingredient.belongsToMany(models.IngredientCategory, {
      through: 'IngredientIngredientCategory',
      as: 'ingredientCategory'
    });

    Ingredient.belongsToMany(models.Instruction, {
      through: 'InstructionIngredient',
      as: 'instruction'
    });

    Ingredient.belongsTo(models.FileData, {
      as: 'image'
    });
  };
  return Ingredient;
};