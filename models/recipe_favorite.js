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
      allowNull: true
    }
  }, {
    timestamps: false
  });
  RecipeFavorite.associate = function(models) {
    // associations can be defined here
    RecipeFavorite.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      as: 'recipe'
    });

    RecipeFavorite.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };
  return RecipeFavorite;
};