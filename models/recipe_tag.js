'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeTag = sequelize.define('RecipeTag', {
    hash: {
      type: DataTypes.STRING(10),
      unique: true,
      allowNull: false
    },
    originalName: {
      type: DataTypes.STRING(45),
      unique: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(45),
      unique: true,
      allowNull: false
    },
  }, {
    tableName: 'RecipeTags',
    timestamps: false
  });
  RecipeTag.associate = function(models) {
    // associations can be defined here
    RecipeTag.belongsToMany(models.Recipe, {
      through: 'RecipeRecipeTag',
      as: 'recipes'
    });
  };
  return RecipeTag;
};