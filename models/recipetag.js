'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeTag = sequelize.define('RecipeTag', {
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'RecipeTag',
    underscored: true,
    timestamps: false
  });
  RecipeTag.associate = function(models) {
    // associations can be defined here
  };
  return RecipeTag;
};