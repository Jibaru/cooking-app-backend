'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Steps', [
      {
        description: 'Step 1',
        index: 1,
        recipe_id: 2
      },
      {
        description: 'Step 2',
        index: 2,
        recipe_id: 2
      },
      {
        description: 'Step 1',
        index: 1,
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
