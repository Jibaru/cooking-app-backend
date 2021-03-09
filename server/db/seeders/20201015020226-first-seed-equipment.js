'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Equipments', 
    [
      {  
        imageId:4,
        name:'LICUADORA',
        description:'Para licuar ingredientes',
        statusId: 1
      },
      {  
        imageId:4,
        name:'BATIDORA',
        description:'Para batir ingredientes',
        statusId: 1
      },
      {  
        imageId:4,
        name:'COCINA',
        description:'Para cocinar ingredientes',
        statusId: 1
      },
      {  
        imageId:4,
        name:'HORNO',
        description:'Para hornear ingrediente',
        statusId: 1
      }
    ],{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Equipments', null, {});
  }
};
