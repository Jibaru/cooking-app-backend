'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe_Tag = sequelize.define('Recipe_Tag', {
    hash: DataTypes.STRING,
    original_name: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  Recipe_Tag.associate = function(models) {
    // associations can be defined here
  };
  return Recipe_Tag;
};