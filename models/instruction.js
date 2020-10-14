'use strict';
module.exports = (sequelize, DataTypes) => {
  const Instruction = sequelize.define('Instruction', {
  }, {});
  Instruction.associate = function(models) {
    // associations can be defined here
    Instruction.belongsToMany(models.Ingredient, {
      through: 'InstructionIngredient',
      as: 'ingredient'
    }); 

    Instruction.hasMany(models.Step, {
      foreignKey: 'instructionId',
      as: 'step'
    });

    Instruction.belongsToMany(models.Equipment, {
      through: 'EquipmentInstruction',
      as: 'equipment'
    }); 

    Instruction.hasOne(models.Recipe, {
      foreignKey: 'instructionId',
      as: 'recipe'
    })
  };
  return Instruction;
};