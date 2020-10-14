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
      allowNull: false
    },
    profileImageId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};