'use strict';
module.exports = (sequelize, DataTypes) => {
  const Equipment = sequelize.define('Equipment', {
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imageId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {});
  Equipment.associate = function(models) {
    // associations can be defined here
  };
  return Equipment;
};