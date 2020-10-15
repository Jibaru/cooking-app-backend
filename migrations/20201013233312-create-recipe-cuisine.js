'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RecipeCuisines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hash: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      originalName: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      region: {
        type: Sequelize.STRING(45),
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('RecipeCuisines');
  }
};