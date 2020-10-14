'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeRanking = sequelize.define('RecipeRanking', {
    score: {
      type: Sequelize.DECIMAL(2, 1),
      allowNull: false,
    },
    timesVisited: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    recipeId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }, {});
  RecipeRanking.associate = function(models) {
    // associations can be defined here
  };
  return RecipeRanking;
};