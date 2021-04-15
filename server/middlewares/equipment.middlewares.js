const validates = require("../validators/validators");
const { checkSchema } = require("express-validator");
const { Equipment } = require("../db/models/index");
const { EquipmentStatusValues } = require("../db/enums/equipment-status");

const createEquipmentMiddleware = checkSchema({
  name: {
    in: ["body"],
    exists: validates.exists("name"),
    trim: true,
    notEmpty: validates.notEmpty("name"),
    isLength: validates.isMaxLength("name", 45),
    custom: validates.existResourceByField("name", Equipment),
  },
  description: {
    in: ["body"],
    optional: true,
    trim: true,
    notEmpty: validates.notEmpty("description"),
    isLength: validates.isMaxLength("description", 65535),
  },
  image: {
    in: ["body"],
    optional: false,
    notEmpty: validates.notEmpty("image"),
  },
});

const deleteEquipmentMiddleware = checkSchema({
  id: {
    in: ["params"],
    exists: validates.exists("id"),
    trim: true,
    notEmpty: validates.notEmpty("id"),
    isInt: validates.isInt("id"),
    custom: validates.existResourceById("id", Equipment),
    toInt: true,
  },
});

const getOneEquipmentMiddleware = checkSchema({
  id: {
    in: ["params"],
    exists: validates.exists("id"),
    trim: true,
    notEmpty: validates.notEmpty("id"),
    isInt: validates.isInt("id"),
    custom: validates.existResourceById("id", Equipment),
    toInt: true,
  },
});

const updateEquipmentMiddleware = checkSchema({
  id: {
    in: ["params"],
    exists: validates.exists("id"),
    trim: true,
    notEmpty: validates.notEmpty("id"),
    isInt: validates.isInt("id"),
    custom: validates.existResourceById("id", Equipment),
    toInt: true,
  },
  name: {
    in: ["body"],
    optional: true,
    exists: validates.exists("name"),
    trim: true,
    notEmpty: validates.notEmpty("name"),
    isLength: validates.isMaxLength("name", 45),
    custom: validates.existResourceByField("name", Equipment),
  },
  description: {
    optional: true,
    trim: true,
    notEmpty: validates.notEmpty("description"),
    isLength: validates.isMaxLength("description", 65535),
  },
  status: {
    in: ["body"],
    optional: true,
    trim: true,
    notEmpty: validates.notEmpty("status"),
    custom: validates.isInEnumList("status", EquipmentStatusValues),
  },
  image: {
    in: ["body"],
    optional: true,
    notEmpty: validates.notEmpty("image"),
  },
});

const getAllEquipmentsMiddleware = checkSchema({
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
  status: {
    optional: true,
    trim: true,
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
  createEquipmentMiddleware,
  deleteEquipmentMiddleware,
  getOneEquipmentMiddleware,
  updateEquipmentMiddleware,
  getAllEquipmentsMiddleware,
};
