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
          // id 4
          name: "herramienta_generica",
          mimeType: "image/jpeg",
          content: fs.readFileSync(assetsDir + "/herramienta_generica.jpg"),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("FileDatas", null, {});
  },
};
