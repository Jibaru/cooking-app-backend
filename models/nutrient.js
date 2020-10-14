'use strict';
module.exports = (sequelize, DataTypes) => {
  const Nutrient = sequelize.define('Nutrient', {
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {});
  Nutrient.associate = function(models) {
    // associations can be defined here
    Nutrient.belongsToMany(models.Ingredient, {
      through: 'IngredientNutrient',
      as: 'ingredient'
    }); 
  };
  return Nutrient;
};