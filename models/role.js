'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    hash: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    originalName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {});
  Role.associate = function(models) {
    // associations can be defined here
    Role.hasMany(models.User, {
      as: 'user',
      foreignKey: 'roleId'
    })
  };
  return Role;
};