'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('RecipeStatuses', 
   [
     {  
        /*hash: 'RS0000001',
        originalName: 'APROBADO',*/
        name: 'APROBADO',
     },
     {  
        /*hash: 'RS0000002',
        originalName: 'POR APROBAR',*/
        name: 'PENDIENTE',
     },
     {  
        /*hash: 'RS0000003',
        originalName: 'DESCARTADO',*/
        name: 'DESCARTADO',
     },
   ],{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('RecipeStatuses', null, {});
  }
};
