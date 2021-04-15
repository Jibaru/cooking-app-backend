"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Ingredients",
      [
        {
          imageId: 1,
          name: "CARNE",
          description: "Carne suave",
        },
        {
          imageId: 2,
          name: "POLLO",
          description: "Pollo suave",
        },
        {
          imageId: 3,
          name: "TOMATE",
          description: "Tomate rojo del Perú",
        },
        {
          imageId: 4,
          name: "CEBOLLA",
          description: "Cebolla roja",
        },
        {
          imageId: 5,
          name: "PAPA AMARILLA",
          description: "Papa amarilla de Huanvelica",
        },
        {
          imageId: 6,
          name: "CHILE",
          description: "Chile mexicano",
        },
        {
          imageId: 7,
          name: "PASTA",
          description: "Pasta italiana",
        },
        {
          imageId: 8,
          name: "ARROZ",
          description: "Arroz norteño",
        },
        {
          imageId: 9,
          name: "HUEVO",
          description: "Huevo de gallina",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Ingredients", null, {});
  },
};
