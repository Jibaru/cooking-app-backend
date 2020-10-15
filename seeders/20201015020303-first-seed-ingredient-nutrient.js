'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('IngredientNutrients', 
    [
      {
        units: 'mg',
        value: 0.31,
        ingredientId: 3,
        nutrientId: 5
      },
      {
        units: 'mg',
        value: 379,
        ingredientId: 3,
        nutrientId: 4
      },
      {
        units: 'mg',
        value: 0.31,
        ingredientId: 1,
        nutrientId: 4
      },
      {
        units: 'mg',
        value: 379,
        ingredientId: 1,
        nutrientId: 2
      },
      {
        units: 'mg',
        value: 379,
        ingredientId: 2,
        nutrientId: 3
      },
      {
        units: 'mg',
        value: 379,
        ingredientId: 4,
        nutrientId: 4
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('IngredientNutrients', null, {});
  }
};
