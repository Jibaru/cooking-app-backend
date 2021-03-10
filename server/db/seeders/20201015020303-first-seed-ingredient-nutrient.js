"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "IngredientNutrients",
      [
        {
          units: "mg",
          value: 0.31,
          ingredientId: 1,
          nutrientId: 5,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("IngredientNutrients", null, {});
  },
};
