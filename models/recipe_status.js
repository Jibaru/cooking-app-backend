'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe_Status = sequelize.define('Recipe_Status', {
    hash: DataTypes.STRING,
    original_name: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  Recipe_Status.associate = function(models) {
    // associations can be defined here
  };
  return Recipe_Status;
};