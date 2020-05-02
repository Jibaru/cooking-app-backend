'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Recipes', [
        {
          name: 'Receta 1',
          description: 'Receta OP1',
          stars: 0
        },
        {
          name: 'Receta 2',
          description: 'Receta OP2',
          stars: 0
        },
        {
          name: 'Receta 3',
          description: 'Receta OP3',
          stars: 0
        },
        {
          name: 'Receta 4',
          description: 'Receta OP4',
          stars: 0
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
