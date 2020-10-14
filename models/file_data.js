'use strict';
module.exports = (sequelize, DataTypes) => {
  const FileData = sequelize.define('FileData', {
    name: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    mimeType: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    content: {
      type: DataTypes.BLOB('long'),
      allowNull: false
    }
  }, {});
  FileData.associate = function(models) {
    // associations can be defined here
  };
  return FileData;
};