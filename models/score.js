'use strict';
module.exports = (sequelize, DataTypes) => {
  const Score = sequelize.define('Score', {
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  }, {
    timestamps: false,
    underscored: true
  });
  Score.associate = function(models) {
    Score.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    });
  };
  return Score;
};