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
    // associations can be defined here
  };
  return User;
};