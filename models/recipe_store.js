'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeStore = sequelize.define('RecipeStore', {
    dateTimeStored: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  RecipeStore.associate = function(models) {
    // associations can be defined here
  };
  return RecipeStore;
};