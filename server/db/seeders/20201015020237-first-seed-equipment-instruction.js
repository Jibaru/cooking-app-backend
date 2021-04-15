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
        {
          equipmentId: 1,
          instructionId: 2,
        },
        {
          equipmentId: 1,
          instructionId: 4,
        },
        {
          equipmentId: 2,
          instructionId: 1,
        },
        {
          equipmentId: 2,
          instructionId: 3,
        },
        {
          equipmentId: 3,
          instructionId: 2,
        },
        {
          equipmentId: 3,
          instructionId: 5,
        },
        {
          equipmentId: 4,
          instructionId: 1,
        },
        {
          equipmentId: 4,
          instructionId: 2,
        },
        {
          equipmentId: 4,
          instructionId: 3,
        },
        {
          equipmentId: 4,
          instructionId: 4,
        },
        {
          equipmentId: 5,
          instructionId: 1,
        },
        {
          equipmentId: 6,
          instructionId: 3,
        },
        {
          equipmentId: 6,
          instructionId: 5,
        },
        {
          equipmentId: 7,
          instructionId: 1,
        },
        {
          equipmentId: 7,
          instructionId: 2,
        },
        {
          equipmentId: 7,
          instructionId: 3,
        },
        {
          equipmentId: 7,
          instructionId: 4,
        },
        {
          equipmentId: 8,
          instructionId: 1,
        },
        {
          equipmentId: 8,
          instructionId: 2,
        },
        {
          equipmentId: 8,
          instructionId: 3,
        },
        {
          equipmentId: 9,
          instructionId: 1,
        },
        {
          equipmentId: 9,
          instructionId: 2,
        },
        {
          equipmentId: 9,
          instructionId: 4,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("EquipmentInstructions", null, {});
  },
};
