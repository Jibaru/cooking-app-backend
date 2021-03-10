"use strict";
const { RegionValues } = require("../enums/region");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("RecipeCuisines", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique: true,
      },
      region: {
        type: Sequelize.ENUM(RegionValues),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("RecipeCuisines");
  },
};
