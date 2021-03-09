'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('EquipmentInstructions', 
    [
      {  
        equipmentId: 1,
        instructionId: 1,
      },
      {  
        equipmentId: 2,
        instructionId: 1,
      },
      {  
        equipmentId: 1,
        instructionId: 2,
      },
      {  
        equipmentId: 3,
        instructionId: 3,
      },
      {
        equipmentId: 4,
        instructionId: 3,
      }
    ],{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('EquipmentInstructions', null, {});
  }
};
