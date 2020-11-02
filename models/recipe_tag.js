'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeTag = sequelize.define('RecipeTag', {
    name: {
      type: DataTypes.STRING(45),
      unique: true,
      allowNull: false,
      set(value) {
        this.setDataValue('name', value.toUpperCase());
      }
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