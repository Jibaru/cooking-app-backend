'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe_Type = sequelize.define('Recipe_Type', {
    hash: DataTypes.STRING,
    original_name: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Recipe_Type.associate = function(models) {
    // associations can be defined here
  };
  return Recipe_Type;
};