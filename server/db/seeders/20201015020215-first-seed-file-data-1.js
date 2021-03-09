"use strict";
const fs = require("fs");
const path = require("path");
const assetsDir = path.resolve("resources/static/assets/images/default");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "FileDatas",
      [
        {
          // id 1
          name: "avatar_generico",
          mimeType: "image/jpeg",
          content: fs.readFileSync(assetsDir + "/avatar_generico.jpg"),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("FileDatas", null, {});
  },
};
