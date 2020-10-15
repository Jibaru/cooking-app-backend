'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeCuisine = sequelize.define('RecipeCuisine', {
    hash: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    originalName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    region: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    timestamps: false
  });
  RecipeCuisine.associate = function(models) {
    // associations can be defined here
    RecipeCuisine.hasMany(models.Recipe, {
      as: 'recipes',
      foreignKey: 'recipeCuisineId'
    });
  };
  return RecipeCuisine;
};