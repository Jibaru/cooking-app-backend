'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('Ingredient', {
    name: {
      type: DataTypes.STRING(45),
      unique: true,
      allowNull: false,
      set(value) {
        this.setDataValue('name', value.toUpperCase());
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imageId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    statusId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'Ingredients',
    timestamps: false
  });
  Ingredient.associate = function(models) {
    // associations can be defined here
    Ingredient.belongsToMany(models.Nutrient, {
      through: 'IngredientNutrient',
      as: 'nutrients'
    });

    Ingredient.belongsToMany(models.IngredientCategory, {
      through: 'IngredientIngredientCategory',
      as: 'ingredientCategories'
    });

    Ingredient.belongsToMany(models.Instruction, {
      through: 'InstructionIngredient',
      as: 'instructions'
    });

    Ingredient.belongsTo(models.FileData, {
      as: 'image',
      foreignKey: 'imageId'
    });

    Ingredient.belongsTo(models.Status, {
      as: 'status',
      foreignKey: 'statusId'
    });
  };
  return Ingredient;
};