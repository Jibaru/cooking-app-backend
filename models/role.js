'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'Roles',
    timestamps: false
  });
  Role.associate = function(models) {
    // associations can be defined here
    Role.hasMany(models.User, {
      as: 'users',
      foreignKey: 'roleId'
    });
  };
  return Role;
};