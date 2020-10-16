'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeRanking = sequelize.define('RecipeRanking', {
    score: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: false,
    },
    timesVisited: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'RecipeRankings',
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