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
          // id 3
          name: "ingrediente_generico",
          mimeType: "image/jpeg",
          content: fs.readFileSync(assetsDir + "/ingrediente_generico.jpg"),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("FileDatas", null, {});
  },
};
