'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserNotifications', 
    [
      {
        subject: 'Bienvenido al sistema',
        content: 'Bienvenido al sistema estimado. El equipo le da la bienvenida.',
        dateTimeSended: new Date(),
        userId: 3
      },
      {
        subject: 'Bienvenido al sistema',
        content: 'Bienvenido al sistema estimado 2. El equipo le da la bienvenida.',
        dateTimeSended: new Date(),
        userId: 3
      },
      {
        subject: 'Bienvenido al sistema',
        content: 'Bienvenido al sistema estimado 3. El equipo le da la bienvenida.',
        dateTimeSended: new Date(),
        userId: 2
      },
      {
        subject: 'Bienvenido al sistema',
        content: 'Bienvenido al sistema estimado 4. El equipo le da la bienvenida.',
        dateTimeSended: new Date(),
        userId: 4
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserNotifications', null, {});
  }
};
