'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('InstructionIngredients', 
    [
      {
        value: 4,
        units: 'mg',
        instructionId: 1,
        ingredientId: 1,
      },
      {
        value: 1,
        units: 'mg',
        instructionId: 1,
        ingredientId: 2,
      },
      {
        value: 1.5,
        units: 'mg',
        instructionId: 2,
        ingredientId: 3,
      },
      {
        value: 0.6,
        units: 'tazas',
        instructionId: 3,
        ingredientId: 1,
      },
      {
        value: 0.6,
        units: 'gr',
        instructionId: 3,
        ingredientId: 2,
      },
      {
        value: 0.6,
        units: 'oz',
        instructionId: 3,
        ingredientId: 3,
      },
      {
        value: 2,
        units: 'cucharas',
        instructionId: 3,
        ingredientId: 4,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('InstructionIngredients', null, {});
  }
};
