const { checkSchema } = require("express-validator");
const {
  FileData,
  Recipe,
  RecipeCuisine,
  RecipeType,
  User,
} = require("../db/models/index");
const { RecipeStatusValues } = require("../db/enums/recipe-status");
const validators = require("../validators/validators");

const createRecipeMiddleware = checkSchema({
  recipeImageId: {
    in: ["body"],
    optional: true,
    trim: true,
    notEmpty: validators.notEmpty("recipeImageId"),
    isInt: validators.isInt("recipeImageId"),
    custom: validators.existResourceById("recipeImageId", FileData),
    // Sanitizers
    toInt: true,
  },
  createdById: {
    in: ["body"],
    optional: true,
    trim: true,
    notEmpty: validators.notEmpty("createdById"),
    isInt: validators.isInt("createdById"),
    custom: validators.existResourceById("createdById", User),
    // Sanitizers
    toInt: true,
  },
  recipeCuisineId: {
    in: ["body"],
    optional: true,
    trim: true,
    notEmpty: validators.notEmpty("recipeCuisineId"),
    isInt: validators.isInt("recipeCuisineId"),
    custom: validators.existResourceById("recipeCuisineId", RecipeCuisine),
    // Sanitizers
    toInt: true,
  },
  recipeTypeId: {
    in: ["body"],
    optional: true,
    trim: true,
    notEmpty: validators.notEmpty("recipeTypeId"),
    isInt: validators.isInt("recipeTypeId"),
    custom: validators.existResourceById("recipeTypeId", RecipeType),
    // Sanitizers
    toInt: true,
  },
  dateTimePublished: {
    in: ["body"],
    optional: true,
    trim: true,
    isDate: validators.isDate("dateTimePublished"),
    // Sanitizers
    toDate: true,
  },
  title: {
    in: ["body"],
    optional: false,
    exists: validators.exists("title"),
    trim: true,
    notEmpty: validators.notEmpty("title"),
    isNumeric: validators.isNumericAndNotString("title"),
    isLength: validators.isMaxLength("title", 45),
  },
  description: {
    in: ["body"],
    optional: false,
    exists: validators.exists("description"),
    trim: true,
    notEmpty: validators.notEmpty("description"),
    isNumeric: validators.isNumericAndNotString("description"),
    isLength: validators.isMaxLength("description", 65535),
  },
  yield: {
    in: ["body"],
    optional: true,
    trim: true,
    notEmpty: validators.notEmpty("yield"),
    isInt: validators.isInt("yield"),
    // Sanitizers
    toInt: true,
  },
  prepTime: {
    in: ["body"],
    optional: false,
    exists: validators.exists("prepTime"),
    trim: true,
    notEmpty: validators.notEmpty("prepTime"),
    isInt: validators.isInt("prepTime"),
    // Sanitizers
    toInt: true,
  },
  cookTime: {
    in: ["body"],
    optional: false,
    exists: validators.exists("cookTime"),
    trim: true,
    notEmpty: validators.notEmpty("cookTime"),
    isInt: validators.isInt("cookTime"),
    // Sanitizers
    toInt: true,
  },
});

const getOneRecipeMiddleware = checkSchema({
  id: {
    in: ["params"],
    exists: validators.exists("id"),
    trim: true,
    notEmpty: validators.notEmpty("id"),
    isInt: validators.isInt("id"),
    custom: validators.existResourceById("id", Recipe),
    // Sanitizers
    toInt: true,
  },
});

const updateRecipeMiddleware = checkSchema({
  id: {
    in: ["params"],
    exists: validators.exists("id"),
    trim: true,
    notEmpty: validators.notEmpty("id"),
    isInt: validators.isInt("id"),
    custom: validators.existResourceById("id", Recipe),
    // Sanitizers
    toInt: true,
  },
  recipeImageId: {
    in: ["body"],
    optional: true,
    trim: true,
    notEmpty: validators.notEmpty("recipeImageId"),
    isInt: validators.isInt("recipeImageId"),
    custom: validators.existResourceById("recipeImageId", FileData),
    // Sanitizers
    toInt: true,
  },
  status: {
    in: ["body"],
    optional: true,
    trim: true,
    notEmpty: validators.notEmpty("status"),
    custom: validators.isInEnumList("status", RecipeStatusValues),
  },
  recipeCuisineId: {
    in: ["body"],
    optional: true,
    trim: true,
    notEmpty: validators.notEmpty("recipeCuisineId"),
    isInt: validators.isInt("recipeCuisineId"),
    custom: validators.existResourceById("recipeCuisineId", RecipeCuisine),
    // Sanitizers
    toInt: true,
  },
  recipeTypeId: {
    in: ["body"],
    optional: true,
    trim: true,
    notEmpty: validators.notEmpty("recipeTypeId"),
    isInt: validators.isInt("recipeTypeId"),
    custom: validators.existResourceById("recipeTypeId", RecipeType),
    // Sanitizers
    toInt: true,
  },
  title: {
    in: ["body"],
    optional: true,
    exists: validators.exists("title"),
    trim: true,
    notEmpty: validators.notEmpty("title"),
    isNumeric: validators.isNumericAndNotString("title"),
    isLength: validators.isMaxLength("title", 45),
  },
  description: {
    in: ["body"],
    optional: true,
    exists: validators.exists("description"),
    trim: true,
    notEmpty: validators.notEmpty("description"),
    isNumeric: validators.isNumericAndNotString("description"),
    isLength: validators.isMaxLength("description", 65535),
  },
  yield: {
    in: ["body"],
    optional: true,
    trim: true,
    notEmpty: validators.notEmpty("yield"),
    isInt: validators.isInt("yield"),
    // Sanitizers
    toInt: true,
  },
  prepTime: {
    in: ["body"],
    optional: true,
    exists: validators.exists("prepTime"),
    trim: true,
    notEmpty: validators.notEmpty("prepTime"),
    isInt: validators.isInt("prepTime"),
    // Sanitizers
    toInt: true,
  },
  cookTime: {
    in: ["body"],
    optional: true,
    exists: validators.exists("cookTime"),
    trim: true,
    notEmpty: validators.notEmpty("cookTime"),
    isInt: validators.isInt("cookTime"),
    // Sanitizers
    toInt: true,
  },
});

module.exports = {
  createRecipeMiddleware,
  getOneRecipeMiddleware,
  updateRecipeMiddleware,
};
