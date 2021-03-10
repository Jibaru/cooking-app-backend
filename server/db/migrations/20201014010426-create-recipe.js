"use strict";
const { RecipeStatus, RecipeStatusValues } = require("../enums/recipe-status");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Recipes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      dateTimePublished: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
      },
      title: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      yield: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      prepTime: {
        type: Sequelize.BIGINT, // Milliseconds time
        allowNull: false,
      },
      cookTime: {
        type: Sequelize.BIGINT, // Milliseconds time
        allowNull: false,
      }, // Total Time is: prepTime + cookTime
      status: {
        type: Sequelize.ENUM(RecipeStatusValues),
        allowNull: false,
        defaultValue: RecipeStatus.PENDING.VALUE,
      },
      recipeImageId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: true,
        references: {
          model: {
            tableName: "FileDatas",
          },
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      instructionId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: true,
        references: {
          model: {
            tableName: "Instructions",
          },
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      createdById: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      recipeCuisineId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: "RecipeCuisines",
          },
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      recipeTypeId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: "RecipeTypes",
          },
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
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
    return queryInterface.dropTable("Recipes");
  },
};
