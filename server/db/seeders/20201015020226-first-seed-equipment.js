"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Equipments",
      [
        {
          imageId: 1,
          name: "LICUADORA",
          description: "Para licuar ingredientes",
        },
        {
          imageId: 2,
          name: "BATIDORA",
          description: "Bate los ingredientes",
        },
        {
          imageId: 3,
          name: "RAYADORA",
          description: "Raya ingredientes",
        },
        {
          imageId: 4,
          name: "CUCHARÓN",
          description: "Cuchara grande",
        },
        {
          imageId: 5,
          name: "OLLA ARROCERA",
          description: "Permite hacer arroz",
        },
        {
          imageId: 6,
          name: "OLLA DE BARRO",
          description: "Olla de barro",
        },
        {
          imageId: 7,
          name: "PARRILLA",
          description: "Para asar la carne",
        },
        {
          imageId: 8,
          name: "ESPATULA",
          description: "Espátula de cocina",
        },
        {
          imageId: 9,
          name: "AMASADORA",
          description: "Permite amasar",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Equipments", null, {});
  },
};
