const { checkSchema } = require("express-validator");
const { Nutrient } = require("../db/models/index");
const validators = require("../validators/validators");

const createNutrientMiddleware = checkSchema({
  name: {
    in: ["body"],
    exists: validators.exists("name"),
    trim: true,
    notEmpty: validators.notEmpty("name"),
    isLength: validators.isMaxLength("name", 45),
    isNumeric: validators.isNumericAndNotString("name"),
    custom: validators.existResourceByField("name", Nutrient),
  },
});

const deleteNutrientMiddleware = checkSchema({
  id: {
    in: ["params"],
    exists: validators.exists("id"),
    trim: true,
    notEmpty: validators.notEmpty("id"),
    isInt: validators.isInt("id"),
    custom: validators.existResourceById("id", Nutrient),
    // Sanitizers
    toInt: true,
  },
});

const getOneNutrientMiddleware = checkSchema({
  id: {
    in: ["params"],
    exists: validators.exists("id"),
    trim: true,
    notEmpty: validators.notEmpty("id"),
    isInt: validators.isInt("id"),
    custom: validators.existResourceById("id", Nutrient),
    // Sanitizers
    toInt: true,
  },
});

const getAllNutrientsMiddleware = checkSchema({
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
  createNutrientMiddleware,
  deleteNutrientMiddleware,
  getOneNutrientMiddleware,
  getAllNutrientsMiddleware,
};
