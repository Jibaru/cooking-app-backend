'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('RecipeTags', 
   [
     {  
        /*hash: 'RT0000001',
        originalName: 'RICO',*/
        name: 'RICO',
     },
     {  
        /*hash: 'RT0000002',
        originalName: 'RAPIDO',*/
        name: 'RAPIDO',
     },
     {  
        /*hash: 'RT0000003',
        originalName: 'SABROSO',*/
        name: 'SABROSO',
     },
     {  
        /*hash: 'RT0000004',
        originalName: 'LENTO',*/
        name: 'Lento',
     },
   ],{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('RecipeTags', null, {});
  }
};
