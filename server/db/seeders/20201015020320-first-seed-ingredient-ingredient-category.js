"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "IngredientIngredientCategories",
      [
        {
          ingredientId: 1,
          ingredientCategoryId: 3,
        },
        {
          ingredientId: 1,
          ingredientCategoryId: 4,
        },
        {
          ingredientId: 1,
          ingredientCategoryId: 3,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      "IngredientIngredientCategories",
      null,
      {}
    );
  },
};
