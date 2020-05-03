'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
  
    return queryInterface.bulkInsert('Users', [
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'email1@gmail.com',
        role: 'NORMAL',
        password: bcrypt.hashSync('1234', 10),
        image_profile: null
      },
      {
        first_name: 'Jose',
        last_name: 'Gomez',
        email: 'email2@gmail.com',
        role: 'NORMAL',
        password: bcrypt.hashSync('1234', 10),
        image_profile: null
      },
      {
        first_name: 'Lia',
        last_name: 'Salas',
        email: 'email3@gmail.com',
        role: 'NORMAL',
        password: bcrypt.hashSync('1234', 10),
        image_profile: null
      },
    ], {
      
    });
    
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
