const { checkSchema } = require("express-validator");
const { Step } = require("../db/models/index");
const validators = require("../validators/validators");

const getOneStepMiddleware = checkSchema({
  id: {
    in: ["params"],
    exists: validators.exists("id"),
    trim: true,
    notEmpty: validators.notEmpty("id"),
    isInt: validators.isInt("id"),
    custom: validators.existResourceById("id", Step),
    // Sanitizers
    toInt: true,
  },
});

module.exports = {
  getOneStepMiddleware,
};
