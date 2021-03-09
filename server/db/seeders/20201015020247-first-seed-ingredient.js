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
        {
          imageId: 3,
          name: "LECHE",
          description: "Leche de vaca",
        },
        {
          imageId: 3,
          name: "PAPA",
          description: "Papa rosada",
        },
        {
          imageId: 3,
          name: "LECHUGA",
          description: "Para la ensalada",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Ingredients", null, {});
  },
};
