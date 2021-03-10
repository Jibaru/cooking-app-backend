"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "RecipeRankings",
      [
        {
          recipeId: 1,
          userId: 1,
          score: 3.2,
          timesVisited: 1,
        },
        {
          recipeId: 1,
          userId: 2,
          score: 2.1,
          timesVisited: 2,
        },
        {
          recipeId: 1,
          userId: 3,
          score: 4.6,
          timesVisited: 3,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("RecipeRankings", null, {});
  },
};
