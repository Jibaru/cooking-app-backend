"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "RecipeFavorites",
      [
        {
          dateTimeLiked: new Date(),
          recipeId: 1,
          userId: 1,
        },
        {
          dateTimeLiked: new Date(),
          recipeId: 1,
          userId: 2,
        },
        {
          dateTimeLiked: new Date(),
          recipeId: 1,
          userId: 3,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("RecipeFavorites", null, {});
  },
};
