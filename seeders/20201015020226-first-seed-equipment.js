'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Equipments', 
    [
      {  
        imageId:4,
        name:'LICUADORA',
        description:'Para licuar ingredientes'
      },
      {  
        imageId:4,
        name:'BATIDORA',
        description:'Para batir ingredientes'
      },
      {  
        imageId:4,
        name:'COCINA',
        description:'Para cocinar ingredientes'
      },
      {  
        imageId:4,
        name:'HORNO',
        description:'Para hornear ingrediente'
      }
    ],{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Equipments', null, {});
  }
};
