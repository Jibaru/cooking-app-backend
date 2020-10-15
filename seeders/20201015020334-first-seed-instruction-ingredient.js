'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('InstructionIngredients', 
    [
      {
        amount: 4,
        instructionId: 1,
        ingredientId: 1,
      },
      {
        amount: 1,
        instructionId: 1,
        ingredientId: 2,
      },
      {
        amount: 1.5,
        instructionId: 2,
        ingredientId: 3,
      },
      {
        amount: 0.6,
        instructionId: 3,
        ingredientId: 1,
      },
      {
        amount: 0.6,
        instructionId: 3,
        ingredientId: 2,
      },
      {
        amount: 0.6,
        instructionId: 3,
        ingredientId: 3,
      },
      {
        amount: 2,
        instructionId: 3,
        ingredientId: 4,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('InstructionIngredients', null, {});
  }
};
