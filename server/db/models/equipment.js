"use strict";
const {
  EquipmentStatus,
  EquipmentStatusValues,
} = require("../enums/equipment-status");

module.exports = (sequelize, DataTypes) => {
  const Equipment = sequelize.define(
    "Equipment",
    {
      name: {
        type: DataTypes.STRING(45),
        unique: true,
        allowNull: false,
        set(value) {
          this.setDataValue("name", value.toUpperCase());
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM(EquipmentStatusValues),
        allowNull: false,
        defaultValue: EquipmentStatus.PENDING.VALUE,
      },
      imageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
      },
    },
    {
      tableName: "Equipments",
      timestamps: false,
    }
  );
  Equipment.associate = function (models) {
    // associations can be defined here
    Equipment.belongsToMany(models.Instruction, {
      through: "EquipmentInstruction",
      as: "instructions",
    });

    Equipment.belongsTo(models.FileData, {
      as: "image",
      foreignKey: "imageId",
    });
  };
  return Equipment;
};
