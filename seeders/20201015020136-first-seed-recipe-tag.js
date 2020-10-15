'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('RecipeTags', 
   [
     {  
        hash: 'RT0000001',
        originalName: 'RICO',
        name: 'Rico',
     },
     {  
        hash: 'RT0000002',
        originalName: 'RAPIDO',
        name: 'Rapido',
     },
     {  
        hash: 'RT0000003',
        originalName: 'SABROSO',
        name: 'Sabroso',
     },
     {  
        hash: 'RT0000004',
        originalName: 'LENTO',
        name: 'Lento',
     },
   ],{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('RecipeTags', null, {});
  }
};
