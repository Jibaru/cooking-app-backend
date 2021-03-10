"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Instructions", [{}], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Instructions", null, {});
  },
};
