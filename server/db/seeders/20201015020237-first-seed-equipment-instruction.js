"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "EquipmentInstructions",
      [
        {
          equipmentId: 1,
          instructionId: 1,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("EquipmentInstructions", null, {});
  },
};
