const { checkSchema } = require("express-validator");
const { Ingredient, FileData } = require("../db/models/index");
const { IngredientStatusValues } = require("../db/enums/ingredient-status");
const validators = require("../validators/validators");

const createIngredientMiddleware = checkSchema({
  /*imageId: {
        in: ['body'],
        optional: true,
        trim: true,
        notEmpty: validators.notEmpty('imageId'),
        isInt: validators.isInt('imageId'),
        custom: validators.existResourceById('imageId', FileData),
        // Sanitizers
        toInt: true
    },*/
  name: {
    in: ["body"],
    optional: false,
    // Sanitizers
    trim: true,
    exists: validators.exists("name"),
    notEmpty: validators.notEmpty("name"),
    isLength: validators.isMaxLength("name", 45),
    isNumeric: validators.isNumericAndNotString("name"),
    custom: validators.existResourceByField("name", Ingredient),
  },
  description: {
    in: ["body"],
    optional: true,
    // Sanitizers
    trim: true,
    notEmpty: validators.notEmpty("description"),
    isNumeric: validators.isNumericAndNotString("description"),
    isLength: validators.isMaxLength("description", 65535),
  },
  image: {
    in: ["body"],
    optional: false,
    notEmpty: validators.notEmpty("image"),
  },
});

const getOneIngredientMiddleware = checkSchema({
  id: {
    in: ["params"],
    exists: validators.exists("id"),
    trim: true,
    notEmpty: validators.notEmpty("id"),
    isInt: validators.isInt("id"),
    custom: validators.existResourceById("id", Ingredient),
    // Sanitizers
    toInt: true,
  },
});

const updateIngredientMiddleware = checkSchema({
  id: {
    in: ["params"],
    exists: validators.exists("id"),
    trim: true,
    notEmpty: validators.notEmpty("id"),
    isInt: validators.isInt("id"),
    custom: validators.existResourceById("id", Ingredient),
    // Sanitizers
    toInt: true,
  },
  /*imageId: {
        in: ['body'],
        optional: true,
        trim: true,
        notEmpty: validators.notEmpty('imageId'),
        isInt: validators.isInt('imageId'),
        custom: validators.existResourceById('imageId', FileData),
        // Sanitizers
        toInt: true
    },*/
  name: {
    in: ["body"],
    optional: true,
    // Sanitizers
    trim: true,
    exists: validators.exists("name"),
    notEmpty: validators.notEmpty("name"),
    isLength: validators.isMaxLength("name", 45),
    isNumeric: validators.isNumericAndNotString("name"),
    custom: validators.existResourceByField("name", Ingredient),
  },
  description: {
    in: ["body"],
    optional: true,
    // Sanitizers
    trim: true,
    notEmpty: validators.notEmpty("description"),
    isLength: validators.isMaxLength("description", 65535),
    isNumeric: validators.isNumericAndNotString("description"),
  },
  status: {
    in: ["body"],
    optional: true,
    trim: true,
    notEmpty: validators.notEmpty("status"),
    custom: validators.isInEnumList("status", IngredientStatusValues),
  },
  image: {
    in: ["body"],
    optional: true,
    notEmpty: validators.notEmpty("image"),
  },
});

module.exports = {
  createIngredientMiddleware,
  getOneIngredientMiddleware,
  updateIngredientMiddleware,
};
