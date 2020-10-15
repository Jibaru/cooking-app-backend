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
      allowNull: true
    }
  }, {
    timestamps: false
  });
  RecipeRanking.associate = function(models) {
    // associations can be defined here
    RecipeRanking.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      as: 'recipe'
    });

    RecipeRanking.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };
  return RecipeRanking;
};