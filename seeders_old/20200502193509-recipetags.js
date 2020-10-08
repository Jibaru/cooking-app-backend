'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('RecipeTags', [
      {
        recipe_id: 1,
        tag_id: 2
      },
      {
        recipe_id: 1,
        tag_id: 3
      },
      {
        recipe_id: 3,
        tag_id: 1
      },
      {
        recipe_id: 1,
        tag_id: 2
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
