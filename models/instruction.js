'use strict';
module.exports = (sequelize, DataTypes) => {
  const Instruction = sequelize.define('Instruction', {
  }, {
    tableName: 'Instructions',
    timestamps: false
  });
  Instruction.associate = function(models) {
    // associations can be defined here
    Instruction.belongsToMany(models.Ingredient, {
      through: 'InstructionIngredient',
      as: 'ingredients'
    }); 

    Instruction.hasMany(models.Step, {
      foreignKey: 'instructionId',
      as: 'steps'
    });

    Instruction.belongsToMany(models.Equipment, {
      through: 'EquipmentInstruction',
      as: 'equipments'
    }); 

    Instruction.hasOne(models.Recipe, {
      foreignKey: 'instructionId',
      as: 'recipe'
    })
  };
  return Instruction;
};