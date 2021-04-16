"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "EquipmentRecipes",
      [
        {
          equipmentId: 1,
          recipeId: 1,
        },
        {
          equipmentId: 1,
          recipeId: 2,
        },
        {
          equipmentId: 1,
          recipeId: 4,
        },
        {
          equipmentId: 2,
          recipeId: 1,
        },
        {
          equipmentId: 2,
          recipeId: 3,
        },
        {
          equipmentId: 3,
          recipeId: 2,
        },
        {
          equipmentId: 3,
          recipeId: 5,
        },
        {
          equipmentId: 4,
          recipeId: 1,
        },
        {
          equipmentId: 4,
          recipeId: 2,
        },
        {
          equipmentId: 4,
          recipeId: 3,
        },
        {
          equipmentId: 4,
          recipeId: 4,
        },
        {
          equipmentId: 5,
          recipeId: 1,
        },
        {
          equipmentId: 6,
          recipeId: 3,
        },
        {
          equipmentId: 6,
          recipeId: 5,
        },
        {
          equipmentId: 7,
          recipeId: 1,
        },
        {
          equipmentId: 7,
          recipeId: 2,
        },
        {
          equipmentId: 7,
          recipeId: 3,
        },
        {
          equipmentId: 7,
          recipeId: 4,
        },
        {
          equipmentId: 8,
          recipeId: 1,
        },
        {
          equipmentId: 8,
          recipeId: 2,
        },
        {
          equipmentId: 8,
          recipeId: 3,
        },
        {
          equipmentId: 9,
          recipeId: 1,
        },
        {
          equipmentId: 9,
          recipeId: 2,
        },
        {
          equipmentId: 9,
          recipeId: 4,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("EquipmentInstructions", null, {});
  },
};
