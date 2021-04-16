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

const getAllRecipeTagsMiddleware = checkSchema({
  name: {
    optional: true,
    trim: true,
  },
  recipeIds: {
    optional: true,
    isArray: true,
    toArray: true,
    customSanitizer: {
      options: (value) => {
        return value.map((e) => parseInt(e));
      },
    },
  },
  fromCreatedAt: {
    optional: true,
    trim: true,
    toDate: true,
  },
  toCreatedAt: {
    optional: true,
    trim: true,
    toDate: true,
  },
  page: {
    optional: true,
    trim: true,
    toInt: true,
  },
  pageSize: {
    optional: true,
    trim: true,
    toInt: true,
  },
});

module.exports = {
  createRecipeTagMiddleware,
  deleteRecipeTagMiddleware,
  getOneRecipeTagMiddleware,
  getAllRecipeTagsMiddleware,
};
