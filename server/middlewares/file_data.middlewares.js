const { checkSchema } = require("express-validator");
const { FileData } = require("../db/models/index");
const validators = require("../validators/validators");

const getOneFileDataMiddleware = checkSchema({
  id: {
    in: ["params"],
    exists: validators.exists("id"),
    trim: true,
    notEmpty: validators.notEmpty("id"),
    isInt: validators.isInt("id"),
    custom: validators.existResourceById("id", FileData),
    // Sanitizers
    toInt: true,
  },
});

const updateFileDataMiddleware = checkSchema({
  id: {
    in: ["params"],
    exists: validators.exists("id"),
    trim: true,
    notEmpty: validators.notEmpty("id"),
    isInt: validators.isInt("id"),
    custom: validators.existResourceById("id", FileData),
    // Sanitizers
    toInt: true,
  },
});

const getAllFileDatasMiddleware = checkSchema({
  name: {
    optional: true,
    trim: true,
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
  mimeType: {
    optional: true,
    trim: true,
  },
  page: {
    optional: true,
    trim: true,
    isInt: true,
    toInt: true,
  },
  pageSize: {
    optional: true,
    trim: true,
    isInt: true,
    toInt: true,
  },
});

module.exports = {
  getOneFileDataMiddleware,
  updateFileDataMiddleware,
  getAllFileDatasMiddleware,
};
