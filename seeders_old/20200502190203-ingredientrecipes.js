'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('IngredientRecipes', [
      {
        ingredient_id: 1,
        recipe_id: 1
      },
      {
        ingredient_id: 2,
        recipe_id: 1
      },
      {
        ingredient_id: 3,
        recipe_id: 2
      },
      {
        ingredient_id: 2,
        recipe_id: 3
      },
      {
        ingredient_id: 3,
        recipe_id: 3
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
