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
  }, {
    tableName: 'InstructionIngredients',
    timestamps: false
  });
  InstructionIngredient.associate = function(models) {
    // associations can be defined here
    InstructionIngredient.belongsTo(models.Instruction, {
      foreignKey: 'instructionId',
      as: 'instruction'
    });
    InstructionIngredient.belongsTo(models.Ingredient, {
      foreignKey: 'ingredientId',
      as: 'ingredient'
    });
  };
  return InstructionIngredient;
};