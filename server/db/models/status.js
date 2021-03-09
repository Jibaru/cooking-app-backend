'use strict';
module.exports = (sequelize, DataTypes) => {
  const Status = sequelize.define('Status', {
    name: {
      type: DataTypes.STRING(45),
      unique: true,
      allowNull: false,
      set(value) {
        this.setDataValue('name', value.toUpperCase());
      }
    },
  }, {
    tableName: 'Statuses',
    timestamps: false
  });
  Status.associate = function(models) {
    // associations can be defined here
    Status.hasMany(models.Recipe, {
      as: 'recipes',
      foreignKey: 'statusId'
    });

    Status.hasMany(models.Ingredient, {
      as: 'ingredients',
      foreignKey: 'statusId'
    });

    Status.hasMany(models.Equipment, {
      as: 'equipments',
      foreignKey: 'statusId'
    });

    Status.hasMany(models.User, {
      as: 'users',
      foreignKey: 'statusId'
    });
  };
  return Status;
};