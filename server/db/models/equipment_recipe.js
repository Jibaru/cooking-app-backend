"use strict";
module.exports = (sequelize, DataTypes) => {
  const EquipmentRecipe = sequelize.define(
    "EquipmentRecipe",
    {
      equipmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      recipeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "EquipmentRecipes",
      timestamps: false,
    }
  );
  EquipmentRecipe.associate = function (models) {
    // associations can be defined here
    EquipmentRecipe.belongsTo(models.Recipe, {
      foreignKey: "recipeId",
      as: "recipe",
    });
    EquipmentRecipe.belongsTo(models.Equipment, {
      foreignKey: "equipmentId",
      as: "equipment",
    });
  };
  return EquipmentRecipe;
};
