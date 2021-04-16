const { checkSchema } = require("express-validator");
const { IngredientCategory } = require("../db/models/index");
const validators = require("../validators/validators");

const createIngredientCategoryMiddleware = checkSchema({
  name: {
    in: ["body"],
    exists: validators.exists("name"),
    // Sanitizers
    trim: true,
    notEmpty: validators.notEmpty("name"),
    isLength: validators.isMaxLength("name", 45),
    isNumeric: validators.isNumericAndNotString("name"),
    custom: validators.existResourceByField("name", IngredientCategory),
  },
  description: {
    optional: true,
    // Sanitizers
    trim: true,
    notEmpty: validators.notEmpty("description"),
    isLength: validators.isMaxLength("description", 65535),
    isNumeric: validators.isNumericAndNotString("description"),
  },
});

const deleteIngredientCategoryMiddleware = checkSchema({
  id: {
    in: ["params"],
    exists: validators.exists("id"),
    trim: true,
    notEmpty: validators.notEmpty("id"),
    isInt: validators.isInt("name"),
    custom: validators.existResourceById("id", IngredientCategory),
    // Sanitizers
    toInt: true,
  },
});

const getOneIngredientCategoryMiddleware = checkSchema({
  id: {
    in: ["params"],
    exists: validators.exists("id"),
    trim: true,
    notEmpty: validators.notEmpty("id"),
    isInt: validators.isInt("name"),
    custom: validators.existResourceById("id", IngredientCategory),
    // Sanitizers
    toInt: true,
  },
});

const getAllIngredientCategoriesMiddleware = checkSchema({
  name: {
    optional: true,
    trim: true,
  },
  ingredientIds: {
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
  createIngredientCategoryMiddleware,
  deleteIngredientCategoryMiddleware,
  getOneIngredientCategoryMiddleware,
  getAllIngredientCategoriesMiddleware,
};
