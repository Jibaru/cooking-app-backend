'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeStatus = sequelize.define('RecipeStatus', {
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