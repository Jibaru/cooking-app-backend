"use strict";
const { UserStatus, UserStatusValues } = require("../enums/user-status");
const { Role, RoleValues } = require("../enums/role");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      nickName: {
        type: Sequelize.STRING(50),
        allowNull: true,
        unique: true,
      },
      email: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.TEXT, // Max 20 char decodified
        allowNull: false,
      },
      verificationCode: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(UserStatusValues),
        allowNull: false,
        defaultValue: UserStatus.NORMAL.VALUE,
      },
      role: {
        type: Sequelize.ENUM(RoleValues),
        allowNull: false,
        defaultValue: Role.NORMAL.VALUE,
      },
      profileImageId: {
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
    return queryInterface.dropTable("Users");
  },
};
