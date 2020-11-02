'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', 
   [
     {  
        /*hash: 'R00000001',
        originalName: 'SUPERADMINISTRADOR',*/
        name: 'Superadministrador',
     },
     {  
        /*hash: 'R00000002',
        originalName: 'ADMINISTRADOR',*/
        name: 'Administrador',
     },
     {  
        /*hash: 'R00000003',
        originalName: 'NORMAL',*/
        name: 'Normal',
     },
     {
        /*hash: 'R00000004',
        originalName: 'BANEADO',*/
        name: 'Baneado',
     },
   ],{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
