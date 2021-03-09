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

module.exports = {
  createIngredientCategoryMiddleware,
  deleteIngredientCategoryMiddleware,
  getOneIngredientCategoryMiddleware,
};
