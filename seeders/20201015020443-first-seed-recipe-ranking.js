'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('RecipeRankings', 
    [
      {
        recipeId: 1,
        userId: 1,
        score:3.2,
      },
      {
        recipeId: 2,
        userId: 2,
        score:2.1,
      },
      {
        recipeId: 3,
        userId: 3,
        score:4.6,
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('RecipeRankings', null, {});
  }
};
