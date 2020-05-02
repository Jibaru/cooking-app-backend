'use strict';
module.exports = (sequelize, DataTypes) => {
  const Step = sequelize.define('Step', {
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    index: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recipeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Recipe',
        key: 'id',
      }
    }
  }, {
    underscored: true,
    timestamps: false,
    defaultScope: {
      attributes: {
        exclude: ['recipeId']
      }
    }
  });
  Step.associate = function(models) {
    Step.belongsTo(models.Recipe, {
      foreignKey: 'recipeId'
    })
  };
  return Step;
};