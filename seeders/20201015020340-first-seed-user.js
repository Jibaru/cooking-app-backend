'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', 
    [
      {  
        profileImageId:1,
        roleId:1,
        firstName:'Victor',
        lastName:'Vera',
        nickName:'Buenass',
        email:'Vera@gmail.com',
        password:'VeraYauri16'
      },
      {  
        profileImageId:1,
        roleId:2,
        firstName:'Rodrigo',
        lastName:'Varas',
        nickName:'Jenser',
        email:'Varas@gmail.com',
        password:'VarasAgra14'
      },
      {  
        profileImageId:2,
        roleId:2,
        firstName:'Ignacio',
        lastName:'Rueda',
        nickName:'Jibaru',
        email:'Rueda@gmail.com',
        password:'RuedaBoa13'
      },
      {  
        profileImageId:1,
        roleId:3,
        firstName:'Giancarlo',
        lastName:'Chavez',
        nickName:'Cegaje',
        email:'Chavez@gmail.com',
        password:'ChavezAr12'
      }
    ],{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
