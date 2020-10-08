'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false,
    underscored: true
  });
  Favorite.associate = function(models) {
    Favorite.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });

    Favorite.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      as: 'recipe'
    });
  };
  return Favorite;
};