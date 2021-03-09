"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    let oneMinute = 60000;

    return queryInterface.bulkInsert(
      "Recipes",
      [
        {
          dateTimePublished: new Date(),
          title: "Milanesas de pollo",
          description:
            "Ricas milanesas de pollo al gusto del chef don Giancarlo",
          yield: 2,
          prepTime: 90 * oneMinute,
          cookTime: 80 * oneMinute,
          recipeImageId: 2,
          instructionId: 1,
          createdById: 1,
          recipeCuisineId: 1,
          recipeTypeId: 1,
        },
        {
          dateTimePublished: new Date(),
          title: "Arroz con pollo",
          description: "Arroz con culantro y pollo sancochado con papas",
          yield: 1,
          prepTime: 76 * oneMinute,
          cookTime: 34 * oneMinute,
          recipeImageId: 2,
          instructionId: 2,
          createdById: 2,
          recipeCuisineId: 2,
          recipeTypeId: 2,
        },
        {
          dateTimePublished: new Date(),
          title: "Sancochado de carne",
          description: "Sancochado de carne al estilo Punk",
          yield: 3,
          prepTime: 45 * oneMinute,
          cookTime: 22 * oneMinute,
          recipeImageId: 2,
          instructionId: 3,
          createdById: 3,
          recipeCuisineId: 3,
          recipeTypeId: 3,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Recipes", null, {});
  },
};
