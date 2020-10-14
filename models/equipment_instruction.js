'use strict';
module.exports = (sequelize, DataTypes) => {
  const EquipmentInstruction = sequelize.define('EquipmentInstruction', {
    equipmentId: DataTypes.INTEGER,
    instructionId: DataTypes.INTEGER
  }, {});
  EquipmentInstruction.associate = function(models) {
    // associations can be defined here
  };
  return EquipmentInstruction;
};