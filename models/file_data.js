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
    FileData.hasMany(models.Ingredient, {
      as: 'ingredient',
      foreignKey: 'imageId'
    })

    FileData.hasOne(models.User, {
      as: 'user',
      foreignKey: 'profileImageId'
    }) 

    FileData.hasOne(models.Equipment, {
      as: 'equipment',
      foreignKey: 'imageId'
    })
  };
  return FileData;
};