'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('IngredientIngredientCategories', 
    [
      {  
        ingredientId: 4,
        ingredientCategoryId: 3
      },
      {  
        ingredientId: 2,
        ingredientCategoryId: 4
      },
      {  
        ingredientId: 3,
        ingredientCategoryId: 3
      }
    ],{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('IngredientIngredientCategories', null, {});
  }
};
