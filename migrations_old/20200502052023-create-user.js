'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING(126).BINARY,
        allowNull: true,
        defaultValue: null
      },
      last_name: {
        type: Sequelize.STRING(126).BINARY,
        allowNull: true,
        defaultValue: null
      },
      email: {
        type: Sequelize.STRING(126).BINARY,
        unique: true,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING(126).BINARY,
        allowNull: false,
        defaultValue: 'NORMAL',
      },
      password: {
        type: Sequelize.STRING(126).BINARY,
        allowNull: false
      },
      image_profile: {
        type: Sequelize.STRING(126).BINARY,
        allowNull: true,
        defaultValue: null
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};