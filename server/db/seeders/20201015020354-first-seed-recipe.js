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
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Recipes", null, {});
  },
};
