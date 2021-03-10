"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "InstructionIngredients",
      [
        {
          value: 4,
          units: "mg",
          instructionId: 1,
          ingredientId: 1,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("InstructionIngredients", null, {});
  },
};
