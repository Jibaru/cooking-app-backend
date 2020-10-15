'use strict';
module.exports = (sequelize, DataTypes) => {
  const IngredientCategory = sequelize.define('IngredientCategory', {
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    timestamps: false
  });
  IngredientCategory.associate = function(models) {
    // associations can be defined here
    IngredientCategory.belongsToMany(models.Ingredient, {
      through: 'IngredientIngredientCategory',
      as: 'ingredients'
    });
  };
  return IngredientCategory;
};