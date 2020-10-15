'use strict';
module.exports = (sequelize, DataTypes) => {
  const EquipmentInstruction = sequelize.define('EquipmentInstruction', {
    equipmentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    instructionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false
  });
  EquipmentInstruction.associate = function(models) {
    // associations can be defined here
    EquipmentInstruction.belongsTo(models.Instruction, {
      foreignKey: 'instructionId',
      as: 'instruction'
    });
    EquipmentInstruction.belongsTo(models.Equipment, {
      foreignKey: 'equipmentId',
      as: 'equipment'
    });
  };
  return EquipmentInstruction;
};