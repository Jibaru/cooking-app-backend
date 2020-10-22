'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeStatus = sequelize.define('RecipeStatus', {
    hash: {
      type: DataTypes.STRING(10),
      unique: true,
      allowNull: false
    },
    originalName: {
      type: DataTypes.STRING(45),
      unique: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(45),
      unique: true,
      allowNull: false
    },
  }, {
    tableName: 'RecipeStatuses',
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