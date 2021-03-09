const { checkSchema } = require("express-validator");
const { Status } = require("../db/models/index");
const validators = require("../validators/validators");

const getOneStatusMiddleware = checkSchema({
  id: {
    in: ["params"],
    exists: validators.exists("id"),
    trim: true,
    notEmpty: validators.notEmpty("id"),
    isInt: validators.isInt("id"),
    custom: validators.existResourceById("id", Status),
    // Sanitizers
    toInt: true,
  },
});

module.exports = {
  getOneStatusMiddleware,
};
