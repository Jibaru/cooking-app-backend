'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: {
      type: DataTypes.STRING(126).BINARY,
      allowNull: false
    }
  }, {
    underscored: true,
    timestamps: false
  });
  Tag.associate = function(models) {
    Tag.belongsToMany(models.Recipe, {
      through: 'RecipeTags',
      as: 'recipes',
      foreignKey: 'tagId',
      otherKey: 'recipeId'
    });
  };
  return Tag;
};