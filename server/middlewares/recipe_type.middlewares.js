const { checkSchema } = require("express-validator");
const { RecipeType } = require("../db/models/index");
const validators = require("../validators/validators");

const createRecipeTypeMiddleware = checkSchema({
  name: {
    in: ["body"],
    trim: true,
    notEmpty: validators.notEmpty("name"),
    isNumeric: validators.isNumericAndNotString("name"),
    isLength: validators.isMaxLength("name", 45),
    exists: validators.exists("name"),
    custom: validators.existResourceByField("name", RecipeType),
  },
  description: {
    in: ["body"],
    optional: true,
    trim: true,
    notEmpty: validators.notEmpty("description"),
    isNumeric: validators.isNumericAndNotString("description"),
    isLength: validators.isMaxLength("description", 65535),
    // Sanitizers
    trim: true,
  },
});

const deleteRecipeTypeMiddleware = checkSchema({
  id: {
    in: ["params"],
    exists: validators.exists("id"),
    trim: true,
    notEmpty: validators.notEmpty("id"),
    isInt: validators.isInt("id"),
    custom: validators.existResourceById("id", RecipeType),
    // Sanitizers
    toInt: true,
  },
});

const getOneRecipeTypeMiddleware = checkSchema({
  id: {
    in: ["params"],
    exists: validators.exists("id"),
    trim: true,
    notEmpty: validators.notEmpty("id"),
    isInt: validators.isInt("id"),
    custom: validators.existResourceById("id", RecipeType),
    // Sanitizers
    toInt: true,
  },
});

const getAllRecipeTypesMiddleware = checkSchema({
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
  createRecipeTypeMiddleware,
  deleteRecipeTypeMiddleware,
  getOneRecipeTypeMiddleware,
  getAllRecipeTypesMiddleware,
};
