'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

   return queryInterface.bulkInsert('RecipeTypes', 
   [
     {
       hash: 'RT0000001',
       originalName: 'ENTRADA',
       name: 'Entrada',
       description: 'Plato de entrada'
     },
     {
      hash: 'RT0000002',
      originalName: 'POSTRE',
      name: 'Postre',
      description: 'Plato que se come después del segundo'
    },
    {
      hash: 'RT0000003',
      originalName: 'ENSALADA',
      name: 'Ensalada',
      description: 'Plato para acompañar otros platos o hacer dieta'
    },
    {
      hash: 'RT0000004',
      originalName: 'SEGUNDO',
      name: 'Segundo',
      description: 'Plato de gran tamaño para llenar el estómago'
    }
   ],{});

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('RecipeTypes', null, {});
  }
};
