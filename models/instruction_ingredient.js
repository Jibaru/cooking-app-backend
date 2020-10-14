'use strict';
module.exports = (sequelize, DataTypes) => {
  const InstructionIngredient = sequelize.define('InstructionIngredient', {
    amount: {
      type: DataTypes.DECIMAL(10, 4),
      allowNull: false
    },
    instructionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ingredientId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  InstructionIngredient.associate = function(models) {
    // associations can be defined here
  };
  return InstructionIngredient;
};