'use strict';
module.exports = (sequelize, DataTypes) => {
  const IngredientNutrient = sequelize.define('IngredientNutrient', {
    units: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    value: {
      type: DataTypes.DECIMAL(10, 4),
      allowNull: false
    },
    ingredientId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nutrientId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    timestamps: false
  });
  IngredientNutrient.associate = function(models) {
    // associations can be defined here
    IngredientNutrient.belongsTo(models.Nutrient, {
      foreignKey: 'nutrientId',
      as: 'nutrient'
    });
    IngredientNutrient.belongsTo(models.Ingredient, {
      foreignKey: 'ingredientId',
      as: 'ingredient'
    });
  };
  return IngredientNutrient;
};