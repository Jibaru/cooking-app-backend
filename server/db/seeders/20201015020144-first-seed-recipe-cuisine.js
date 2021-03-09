'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('RecipeCuisines', 
   [
     {
       /*hash: 'RC0000001',
       originalName: 'PERUANA',*/
       name: 'PERUANA',
       region: 'Perú'
     },
     {
      /*hash: 'RC0000002',
      originalName: 'LIMEÑA',*/
      name: 'LIMEÑA',
      region: 'Lima'
    },
    {
      /*hash: 'RC0000003',
      originalName: 'LATINA',*/
      name: 'LATINA',
      region: 'Latinoamérica'
    },
    {
      /*hash: 'RC0000004',
      originalName: 'AMERICANA',*/
      name: 'AMERICANA',
      region: 'Estados Unidos'
    }
   ],{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('RecipeCuisines', null, {});
  }
};
