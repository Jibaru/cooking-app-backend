'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe_Cuisine = sequelize.define('Recipe_Cuisine', {
    hash: DataTypes.STRING,
    original_name: DataTypes.STRING,
    name: DataTypes.STRING,
    region: DataTypes.STRING
  }, {});
  Recipe_Cuisine.associate = function(models) {
    // associations can be defined here
  };
  return Recipe_Cuisine;
};