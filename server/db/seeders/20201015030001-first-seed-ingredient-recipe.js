"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "IngredientRecipes",
      [
        {
          value: 4,
          units: "mg",
          recipeId: 1,
          ingredientId: 1,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("InstructionIngredients", null, {});
  },
};
