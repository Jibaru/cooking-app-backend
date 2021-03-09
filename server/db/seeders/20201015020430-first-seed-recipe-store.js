'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('RecipeStores', 
    [
      {
        recipeId: 1,
        userId: 1,
        dateTimeStored: new Date()
      },
      {
        recipeId: 2,
        userId: 2,
        dateTimeStored: new Date()
      },
      {
        recipeId: 3,
        userId: 3,
        dateTimeStored: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('RecipeStores', null, {});
  }
};
