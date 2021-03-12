"use strict";
const { RegionValues } = require("../enums/region");

module.exports = (sequelize, DataTypes) => {
  const RecipeCuisine = sequelize.define(
    "RecipeCuisine",
    {
      name: {
        type: DataTypes.STRING(45),
        unique: true,
        allowNull: false,
        set(value) {
          this.setDataValue("name", value.toUpperCase());
        },
      },
      region: {
        type: DataTypes.ENUM(RegionValues),
        allowNull: false,
      },
    },
    {
      tableName: "RecipeCuisines",
      timestamps: false,
    }
  );
  RecipeCuisine.associate = function (models) {
    // associations can be defined here
    RecipeCuisine.hasMany(models.Recipe, {
      as: "recipes",
      foreignKey: "recipeCuisineId",
    });
  };
  return RecipeCuisine;
};
