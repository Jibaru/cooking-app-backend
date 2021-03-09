'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Nutrients', 
   [
     {  
        name: 'CALORIES',
     },
     {  
        name: 'PROTEINAS',
     },
     {  
        name: 'CARBOHIDRATOS',
     },
     {  
        name: 'CALCIO',
     },
     {  
        name: 'HIERRO',
     },
     {  
        name: 'POTASIO',
     }
   ],{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Nutrients', null, {});
  }
};
