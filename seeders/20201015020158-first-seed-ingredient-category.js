'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('IngredientCategories', 
   [
     {  
        name: 'MENESTRAS',
        description: 'granos o semillas'
     },
     {  
        name: 'FRUTAS',
        description: 'frutas que acompañen el plato'
     },
     {  
        name: 'VERDURAS',
        description: 'Cualquier tipo de verdura'
     },
     {  
        name: 'BEBIDAS',
        description: 'Cualquier bebida necesario'
   },
   ],{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('IngredientCategories', null, {});
  }
};
