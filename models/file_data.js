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
    },
    base64: {
      type: new DataTypes.VIRTUAL(DataTypes.STRING, ['content']),
      get() {
        if(this.content !== null && this.content !== undefined) {
          return this.content.toString('base64');
        }
        return null;
      }
    },
    url: {
      type: new DataTypes.VIRTUAL(DataTypes.STRING, ['base64']),
      get() {
        if(this.base64 !== null && this.mimeType !== null) {
          let uri = `data:${this.mimeType};base64,${this.base64}`;
          delete this.dataValues.content;
          return uri;
        }
        return null;
      }
    }
  }, {
    tableName: 'FileDatas',
    timestamps: false
  });
  FileData.associate = function(models) {
    // associations can be defined here
    FileData.hasMany(models.Ingredient, {
      as: 'ingredients',
      foreignKey: 'imageId'
    }); 

    FileData.hasOne(models.User, {
      as: 'user',
      foreignKey: 'profileImageId'
    });

    FileData.hasOne(models.Equipment, {
      as: 'equipment',
      foreignKey: 'imageId'
    });

    FileData.hasOne(models.Step, {
      as: 'step',
      foreignKey: 'stepImageId'
    });

    FileData.hasOne(models.Recipe, {
      as: 'recipe',
      foreignKey: 'recipeImageId'
    });

  };
  return FileData;
};