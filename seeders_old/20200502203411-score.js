'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('Scores', [
      {
        stars: 1,
        user_id: 1,
        recipe_id: 2
      },
      {
        stars: 1,
        user_id: 2,
        recipe_id: 1
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
