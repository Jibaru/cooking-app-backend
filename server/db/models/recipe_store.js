'use strict';
module.exports = (sequelize, DataTypes) => {
  const RecipeStore = sequelize.define('RecipeStore', {
    dateTimeStored: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    tableName: 'RecipeStores',
    timestamps: false
  });
  RecipeStore.associate = function(models) {
    // associations can be defined here
    RecipeStore.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      as: 'recipe'
    });

    RecipeStore.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };
  return RecipeStore;
};