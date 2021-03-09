const { checkSchema } = require("express-validator");
const { Instruction } = require("../db/models/index");
const validators = require("../validators/validators");

const getOneInstructionMiddleware = checkSchema({
  id: {
    in: ["params"],
    exists: validators.exists("id"),
    trim: true,
    notEmpty: validators.notEmpty("id"),
    isInt: validators.isInt("id"),
    custom: validators.existResourceById("id", Instruction),
    // Sanitizers
    toInt: true,
  },
});

module.exports = {
  getOneInstructionMiddleware,
};
