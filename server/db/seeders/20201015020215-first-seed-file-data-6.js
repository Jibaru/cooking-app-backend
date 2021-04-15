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
          // id 2
          name: "receta_generica",
          mimeType: "image/jpg",
          content: fs.readFileSync(assetsDir + "/receta_generica.jpg"),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("FileDatas", null, {});
  },
};
