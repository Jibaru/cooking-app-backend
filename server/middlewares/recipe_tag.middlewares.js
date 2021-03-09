const { checkSchema } = require("express-validator");
const { RecipeTag } = require("../db/models/index");
const validators = require("../validators/validators");

const createRecipeTagMiddleware = checkSchema({
  name: {
    in: ["body"],
    trim: true,
    notEmpty: validators.notEmpty("name"),
    isNumeric: validators.isNumericAndNotString("name"),
    isLength: validators.isMaxLength("name", 45),
    exists: validators.exists("name"),
    custom: validators.existResourceByField("name", RecipeTag),
  },
});

const deleteRecipeTagMiddleware = checkSchema({
  id: {
    in: ["params"],
    exists: validators.exists("id"),
    trim: true,
    notEmpty: validators.notEmpty("id"),
    isInt: validators.isInt("id"),
    custom: validators.existResourceById("id", RecipeTag),
    // Sanitizers
    toInt: true,
  },
});

const getOneRecipeTagMiddleware = checkSchema({
  id: {
    in: ["params"],
    exists: validators.exists("id"),
    trim: true,
    notEmpty: validators.notEmpty("id"),
    isInt: validators.isInt("id"),
    custom: validators.existResourceById("id", RecipeTag),
    // Sanitizers
    toInt: true,
  },
});

module.exports = {
  createRecipeTagMiddleware,
  deleteRecipeTagMiddleware,
  getOneRecipeTagMiddleware,
};
