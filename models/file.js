'use strict';
module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define('File', {
    name: DataTypes.STRING,
    mimeType: DataTypes.STRING,
    content: DataTypes.BLOB
  }, {});
  File.associate = function(models) {
    // associations can be defined here
  };
  return File;
};