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
          recipeImageId: 1,
          createdById: 1,
          recipeCuisineId: 1,
          recipeTypeId: 1,
        },
        {
          dateTimePublished: new Date(),
          title: "Arroz con pollo",
          description: "Arroz con pollo peruano",
          yield: 2,
          prepTime: 23 * oneMinute,
          cookTime: 22 * oneMinute,
          recipeImageId: 2,
          createdById: 1,
          recipeCuisineId: 1,
          recipeTypeId: 1,
        },
        {
          dateTimePublished: new Date(),
          title: "Arroz chaufa",
          description: "Arroz chaufa rico",
          yield: 2,
          prepTime: 23 * oneMinute,
          cookTime: 22 * oneMinute,
          recipeImageId: 3,
          createdById: 1,
          recipeCuisineId: 1,
          recipeTypeId: 1,
        },
        {
          dateTimePublished: new Date(),
          title: "Tallarín Saltado",
          description: "Tallarín saltado de pollo",
          yield: 3,
          prepTime: 28 * oneMinute,
          cookTime: 29 * oneMinute,
          recipeImageId: 4,
          createdById: 1,
          recipeCuisineId: 1,
          recipeTypeId: 1,
        },
        {
          dateTimePublished: new Date(),
          title: "Pollo al Sillao",
          description: "Pollo al Sillao",
          yield: 3,
          prepTime: 28 * oneMinute,
          cookTime: 29 * oneMinute,
          recipeImageId: 5,
          createdById: 1,
          recipeCuisineId: 1,
          recipeTypeId: 1,
        },
        {
          dateTimePublished: new Date(),
          title: "Papa a la huancaína",
          description: "Rica papa a la huancaína",
          yield: 3,
          prepTime: 28 * oneMinute,
          cookTime: 29 * oneMinute,
          recipeImageId: 6,
          createdById: 1,
          recipeCuisineId: 1,
          recipeTypeId: 1,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Recipes", null, {});
  },
};
