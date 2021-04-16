const { checkSchema } = require("express-validator");
const { RecipeCuisine } = require("../db/models/index");
const { RegionValues } = require("../db/enums/region");
const validators = require("../validators/validators");

const createRecipeCuisineMiddleware = checkSchema({
  name: {
    in: ["body"],
    trim: true,
    notEmpty: validators.notEmpty("name"),
    isNumeric: validators.isNumericAndNotString("name"),
    isLength: validators.isMaxLength("name", 45),
    exists: validators.exists("name"),
    custom: validators.existResourceByField("name", RecipeCuisine),
  },
  region: {
    in: ["body"],
    optional: false,
    trim: true,
    notEmpty: validators.notEmpty("region"),
    custom: validators.isInEnumList("region", RegionValues),
  },
});

const deleteRecipeCuisineMiddleware = checkSchema({
  id: {
    in: ["params"],
    exists: validators.exists("id"),
    trim: true,
    notEmpty: validators.notEmpty("id"),
    isInt: validators.isInt("id"),
    custom: validators.existResourceById("id", RecipeCuisine),
    // Sanitizers
    toInt: true,
  },
});

const getOneRecipeCuisineMiddleware = checkSchema({
  id: {
    in: ["params"],
    exists: validators.exists("id"),
    trim: true,
    notEmpty: validators.notEmpty("id"),
    isInt: validators.isInt("id"),
    custom: validators.existResourceById("id", RecipeCuisine),
    // Sanitizers
    toInt: true,
  },
});

const getAllRecipeCuisinesMiddleware = checkSchema({
  name: {
    optional: true,
    trim: true,
  },
  region: {
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
  createRecipeCuisineMiddleware,
  deleteRecipeCuisineMiddleware,
  getOneRecipeCuisineMiddleware,
  getAllRecipeCuisinesMiddleware,
};
