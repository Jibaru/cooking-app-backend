'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    dateTimePublished: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    title: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    yield: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    prepTime: {
      type: DataTypes.BIGINT, // Milliseconds time
      allowNull: false
    },
    cookTime: {
      type: DataTypes.BIGINT, // Milliseconds time
      allowNull: false
    }, // Total Time is: prepTime + cookTime
    recipeImageId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    recipeStatusId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    instructionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdById: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeCuisineId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    recipeTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Recipe.associate = function(models) {
    // associations can be defined here
    Recipe.belongsTo(models.Instruction, {
      as: 'instruction'
    });
    
  };
  return Recipe;
};