'use strict';
const fs = require('fs');
const path = require('path');
const assetsDir = path.resolve('resources/static/assets/images/default');

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('FileDatas', 
    [
      {
        // id 1
        name: 'avatar_generico',
        mimeType: 'image/jpeg',
        content: fs.readFileSync(
          assetsDir + '/avatar_generico.jpg'
        )
      },
      {
        // id 2
        name: 'receta_generica',
        mimeType: 'image/jpg',
        content: fs.readFileSync(
          assetsDir + '/receta_generica.jpg'
        )
      },
      {
        // id 3
        name: 'ingrediente_generico',
        mimeType: 'image/jpeg',
        content: fs.readFileSync(
          assetsDir + '/ingrediente_generico.jpg'
        )
      },
      {
        // id 4
        name: 'herramienta_generica',
        mimeType: 'image/jpeg',
        content: fs.readFileSync(
          assetsDir + '/herramienta_generica.jpg'
        )
      },
      {
        // id 5
        name: 'paso_generico',
        mimeType: 'image/jpeg',
        content: fs.readFileSync(
          assetsDir + '/paso_generico.jpg'
        )
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('FileDatas', null, {});
  }
};
