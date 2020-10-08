'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkInsert('Ingredients', [
      {
        name: 'Potato',
        description: 'A root vegetable native to the Americas, a starchy tuber of the plant Solanum tuberosum, and the plant itself, a perennial in the family Solanaceae',
        image: 'https://qph.fs.quoracdn.net/main-qimg-047eaef5d6351787e3a9f258ede35ed1'
      },
      {
        name: 'Onion',
        description: 'Is a vegetable that is the most widely cultivated species of the genus Allium',
        image: 'https://gillsonions.com/sites/default/files/s3-images/homepage_onionslice_transparent.png'
      },
      {
        name: 'Rice',
        description: 'As a cereal grain, it is the most widely consumed staple food for a large part of the world\'s human population',
        image: null
      },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
