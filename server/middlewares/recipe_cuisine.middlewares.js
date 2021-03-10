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
    notEmpty: validates.notEmpty("region"),
    custom: validates.isInEnumList("region", RegionValues),
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

module.exports = {
  createRecipeCuisineMiddleware,
  deleteRecipeCuisineMiddleware,
  getOneRecipeCuisineMiddleware,
};
