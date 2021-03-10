"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "RecipeRecipeTags",
      [
        {
          recipeId: 1,
          recipeTagId: 2,
        },
        {
          recipeId: 1,
          recipeTagId: 3,
        },
        {
          recipeId: 1,
          recipeTagId: 1,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("RecipeRecipeTags", null, {});
  },
};
