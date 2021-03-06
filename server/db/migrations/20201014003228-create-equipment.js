"use strict";
const {
  EquipmentStatusValues,
  EquipmentStatus,
} = require("../enums/equipment-status");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Equipments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(45),
        unique: true,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM(EquipmentStatusValues),
        allowNull: false,
        defaultValue: EquipmentStatus.PENDING.VALUE,
      },
      imageId: {
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
    return queryInterface.dropTable("Equipments");
  },
};
