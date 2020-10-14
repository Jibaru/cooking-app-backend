'use strict';
module.exports = (sequelize, DataTypes) => {
  const IngredientNutrient = sequelize.define('IngredientNutrient', {
    ingredientId: DataTypes.INTEGER,
    nutrientId: DataTypes.INTEGER,
    units: DataTypes.STRING,
    value: DataTypes.INTEGER
  }, {});
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