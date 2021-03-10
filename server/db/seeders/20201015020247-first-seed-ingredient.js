"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Ingredients",
      [
        {
          imageId: 3,
          name: "CARNE",
          description: "Carne suave",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Ingredients", null, {});
  },
};
