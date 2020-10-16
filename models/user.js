'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    nickName: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    profileImageId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, {
    tableName: 'Users',
    timestamps: false
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.UserNotification, {
      as: 'userNotifications',
      foreignKey: 'userId'
    });

    User.belongsTo(models.Role, {
      as: 'role',
      foreignKey: 'roleId'
    });

    User.belongsTo(models.FileData, {
      as: 'profileImage',
      foreignKey: 'profileImageId'
    });

    User.belongsToMany(models.Recipe, {
      through: 'RecipeStore',
      as: 'storedRecipes'
    });

    User.belongsToMany(models.Recipe, {
      through: 'RecipeFavorite',
      as: 'favoriteRecipes'
    });

    User.belongsToMany(models.Recipe, {
      through: 'RecipeRanking',
      as: 'rankingRecipes'
    });

    User.hasMany(models.Recipe, {
      as: 'createdRecipes',
      foreignKey: 'createdById'
    });
  };
  return User;
};