'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeFavorite = sequelize.define('RecipeFavorite', {
    dateTimeLiked: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  RecipeFavorite.associate = function(models) {
    // associations can be defined here
  };
  return RecipeFavorite;
};