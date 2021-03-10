"use strict";
const { Region } = require("../enums/region");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "RecipeCuisines",
      [
        {
          name: "Limeña",
          region: Region.SOUTH_AMERICA.VALUE,
        },
        {
          name: "Californiana",
          region: Region.NORTH_AMERICA.VALUE,
        },
        {
          name: "China",
          region: Region.ASIA.VALUE,
        },
        {
          name: "Chilena",
          region: Region.SOUTH_AMERICA.VALUE,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("RecipeCuisines", null, {});
  },
};
