'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('RecipeStatuses', 
   [
     {  
        hash: 'RS0000001',
        originalName: 'APROBADO',
        name: 'Aprobado',
     },
     {  
        hash: 'RS0000002',
        originalName: 'POR APROBAR',
        name: 'Por aprobar',
     },
     {  
        hash: 'RS0000003',
        originalName: 'DESCARTADO',
        name: 'Descartado',
     },
   ],{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('RecipeStatuses', null, {});
  }
};
