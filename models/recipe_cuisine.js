'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeCuisine = sequelize.define('RecipeCuisine', {
    name: {
      type: DataTypes.STRING(45),
      unique: true,
      allowNull: false
    },
    region: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'RecipeCuisines',
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