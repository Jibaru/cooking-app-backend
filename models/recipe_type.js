'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeType = sequelize.define('RecipeType', {
    hash: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true
    },
    originalName: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'RecipeTypes',
    timestamps: false
  });
  RecipeType.associate = function(models) {
    // associations can be defined here
    RecipeType.hasMany(models.Recipe, {
      as: 'recipes',
      foreignKey: 'recipeTypeId'
    });
  };
  return RecipeType;
};