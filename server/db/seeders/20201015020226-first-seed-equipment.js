"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Equipments",
      [
        {
          imageId: 4,
          name: "LICUADORA",
          description: "Para licuar ingredientes",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Equipments", null, {});
  },
};
