'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Ingredients', 
    [
      {  
        imageId: 3,
        name: 'CARNE',
        description: 'Carne suave',
        statusId: 1
      },
      {  
        imageId: 3,
        name: 'LECHE',
        description: 'Leche de vaca',
        statusId: 1
      },
      {  
        imageId: 3,
        name: 'PAPA',
        description: 'Papa rosada',
        statusId: 1
      },
      {  
        imageId: 3,
        name: 'LECHUGA',
        description: 'Para la ensalada',
        statusId: 1
      }
    ],{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Ingredients', null, {});
  }
};
