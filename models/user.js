'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING(126).BINARY,
      allowNull: true,
      defaultValue: null
    },
    lastName: {
      type: DataTypes.STRING(126).BINARY,
      allowNull: true,
      defaultValue: null
    },
    email: {
      type: DataTypes.STRING(126).BINARY,
      unique: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(126).BINARY,
      allowNull: false,
      defaultValue: 'NORMAL',
      validate: {
        isIn: [['NORMAL', 'ADMINISTRATOR', 'SUPERADMINISTRATOR']]
      }
    },
    password: {
      type: DataTypes.STRING(126).BINARY,
      allowNull: false,
    },
    imageProfile: {
      type: DataTypes.STRING(126).BINARY,
      allowNull: true,
      defaultValue: null
    }
  }, {
    underscored:true
  });
  User.associate = function(models) {
    User.hasMany(models.Score, {
      foreignKey: 'userId',
      as: 'scores'
    });

    User.belongsToMany(models.Recipe, {
      through: 'Favorite',
      as: 'favoriteRecipes',
      foreignKey: 'userId',
      otherKey: 'recipeId'
    });
  };
  return User;
};