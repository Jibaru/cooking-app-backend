'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeStatus = sequelize.define('RecipeStatus', {
    hash: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    originalName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
  }, {
    timestamps: false
  });
  RecipeStatus.associate = function(models) {
    // associations can be defined here
    RecipeStatus.hasMany(models.Recipe, {
      as: 'recipes',
      foreignKey: 'recipeStatusId'
    });
  };
  return RecipeStatus;
};