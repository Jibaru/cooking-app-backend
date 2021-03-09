"use strict";
const bcrypt = require("bcrypt");
const { Role } = require("../enums/role");
const { generateRandomString } = require("../../utils/random");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          profileImageId: 1,
          role: Role.SUPER_ADMIN.VALUE,
          firstName: "Victor",
          lastName: "Vera",
          nickName: "Buenass",
          email: "Vera@gmail.com",
          password: bcrypt.hashSync("123456", 10),
          verificationCode: generateRandomString(6),
        },
        {
          profileImageId: 1,
          role: Role.ADMIN.VALUE,
          firstName: "Rodrigo",
          lastName: "Varas",
          nickName: "Jenser",
          email: "Varas@gmail.com",
          password: bcrypt.hashSync("123456", 10),
          verificationCode: generateRandomString(6),
        },
        {
          profileImageId: 2,
          role: Role.NORMAL.VALUE,
          firstName: "Ignacio",
          lastName: "Rueda",
          nickName: "Jibaru",
          email: "Rueda@gmail.com",
          password: bcrypt.hashSync("123456", 10),
          verificationCode: generateRandomString(6),
        },
        {
          profileImageId: 1,
          role: Role.NORMAL.VALUE,
          firstName: "Giancarlo",
          lastName: "Chavez",
          nickName: "Cegaje",
          email: "Chavez@gmail.com",
          password: bcrypt.hashSync("123456", 10),
          verificationCode: generateRandomString(6),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
