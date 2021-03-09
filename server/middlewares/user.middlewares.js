const { checkSchema } = require("express-validator");
const bcrypt = require("bcrypt");
const validators = require("../validators/validators");
const {
  notFoundErrorMessage,
  invalidPassword,
} = require("../utils/error_templates");
const { FileData, Role, User } = require("../db/models/index");

const signinUserMiddleware = checkSchema({
  profileImageId: {
    in: ["body"],
    optional: true,
    // Sanitizers
    trim: true,
    notEmpty: validators.notEmpty("profileImageId"),
    isInt: validators.isInt("profileImageId"),
    custom: validators.existResourceById("profileImageId", FileData),
    // Sanitizers
    toInt: true,
  },
  roleId: {
    in: ["body"],
    optional: true,
    // Sanitizers
    trim: true,
    notEmpty: validators.notEmpty("roleId"),
    isInt: validators.isInt("roleId"),
    custom: validators.existResourceById("roleId", Role),
    // Sanitizers
    toInt: true,
  },
  firstName: {
    in: ["body"],
    optional: false,
    exists: validators.exists("firstName"),
    // Sanitizers
    trim: true,
    notEmpty: validators.notEmpty("firstName"),
    isNumeric: validators.isNumericAndNotString("firstName"),
    isLength: validators.isMaxLength("firstName", 45),
  },
  lastName: {
    in: ["body"],
    optional: false,
    exists: validators.exists("lastName"),
    // Sanitizers
    trim: true,
    notEmpty: validators.notEmpty("lastName"),
    isNumeric: validators.isNumericAndNotString("lastName"),
    isLength: validators.isMaxLength("lastName", 45),
  },
  nickName: {
    in: ["body"],
    optional: false,
    exists: validators.exists("nickName"),
    // Sanitizers
    trim: true,
    notEmpty: validators.notEmpty("nickName"),
    isNumeric: validators.isNumericAndNotString("nickName"),
    isLength: validators.isMaxLength("nickName", 50),
    custom: validators.existResourceByField("nickName", User),
  },
  email: {
    in: ["body"],
    exists: validators.exists("email"),
    trim: true,
    isEmail: validators.isEmail("email"),
    notEmpty: validators.notEmpty("email"),
    isNumeric: validators.isNumericAndNotString("email"),
    isLength: validators.isMaxLength("email", 50),
    custom: validators.existResourceByField("email", User),
  },
  password: {
    in: ["body"],
    exists: validators.exists("password"),
    // Sanitizers
    trim: true,
    notEmpty: validators.notEmpty("password"),
    isLength: validators.isMaxLength("password", 20),
  },
});

const loginUserMiddleware = checkSchema({
  email: {
    in: ["body"],
    optional: false,
    exists: validators.exists("email"),
    trim: true,
    isEmail: validators.isEmail("email"),
    notEmpty: validators.notEmpty("email"),
    isNumeric: validators.isNumericAndNotString("email"),
    isLength: validators.isMaxLength("email", 50),
    custom: {
      options: (value, { req, location, path }) => {
        return User.findOne({
          where: {
            email: value,
          },
        }).then((user) => {
          if (user === null || user === undefined) {
            return Promise.reject(notFoundErrorMessage("email", value));
          }
        });
      },
    },
  },
  password: {
    in: ["body"],
    exists: validators.exists("password"),
    // Sanitizers
    trim: true,
    notEmpty: validators.notEmpty("password"),
    isLength: validators.isMaxLength("password", 20),
    custom: {
      options: (value, { req, location, path }) => {
        return User.findOne({
          where: {
            email: req.body.email,
          },
        }).then((user) => {
          if (!!user) {
            if (!bcrypt.compareSync(value, user.password)) {
              return Promise.reject(invalidPassword());
            }
          }
        });
      },
    },
  },
});

const deleteUserMiddleware = checkSchema({
  id: {
    in: ["params"],
    exists: validators.exists("id"),
    trim: true,
    notEmpty: validators.notEmpty("id"),
    isInt: validators.isInt("id"),
    custom: validators.existResourceById("id", User),
    // Sanitizers
    toInt: true,
  },
});

const getOneUserMiddleware = checkSchema({
  id: {
    in: ["params"],
    exists: validators.exists("id"),
    trim: true,
    notEmpty: validators.notEmpty("id"),
    isInt: validators.isInt("id"),
    custom: validators.existResourceById("id", User),
    // Sanitizers
    toInt: true,
  },
});

const updateUserMiddleware = checkSchema({
  profileImageId: {
    in: ["body"],
    optional: true,
    // Sanitizers
    trim: true,
    notEmpty: validators.notEmpty("profileImageId"),
    isInt: validators.isInt("profileImageId"),
    custom: validators.existResourceById("profileImageId", FileData),
    // Sanitizers
    toInt: true,
  },
  roleId: {
    in: ["body"],
    optional: true,
    // Sanitizers
    trim: true,
    notEmpty: validators.notEmpty("roleId"),
    isInt: validators.isInt("roleId"),
    custom: validators.existResourceById("roleId", Role),
    // Sanitizers
    toInt: true,
  },
  firstName: {
    in: ["body"],
    optional: true,
    exists: validators.exists("firstName"),
    // Sanitizers
    trim: true,
    notEmpty: validators.notEmpty("firstName"),
    isNumeric: validators.isNumericAndNotString("firstName"),
    isLength: validators.isMaxLength("firstName", 45),
  },
  lastName: {
    in: ["body"],
    optional: true,
    exists: validators.exists("lastName"),
    // Sanitizers
    trim: true,
    notEmpty: validators.notEmpty("lastName"),
    isNumeric: validators.isNumericAndNotString("lastName"),
    isLength: validators.isMaxLength("lastName", 45),
  },
  nickName: {
    in: ["body"],
    optional: true,
    exists: validators.exists("nickName"),
    // Sanitizers
    trim: true,
    notEmpty: validators.notEmpty("nickName"),
    isNumeric: validators.isNumericAndNotString("nickName"),
    isLength: validators.isMaxLength("nickName", 50),
    custom: validators.existResourceByField("nickName", User),
  },
  email: {
    in: ["body"],
    optional: true,
    exists: validators.exists("email"),
    trim: true,
    isEmail: validators.isEmail("email"),
    notEmpty: validators.notEmpty("email"),
    isNumeric: validators.isNumericAndNotString("email"),
    isLength: validators.isMaxLength("email", 50),
    custom: validators.existResourceByField("email", User),
  },
  id: {
    in: ["params"],
    exists: validators.exists("id"),
    trim: true,
    notEmpty: validators.notEmpty("id"),
    isInt: validators.isInt("id"),
    custom: validators.existResourceById("id", User),
    // Sanitizers
    toInt: true,
  },
});

const getAllUsersMiddleware = checkSchema({
  firstName: {
    optional: true,
    trim: true,
  },
  lastName: {
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
  roleId: {
    optional: true,
    trim: true,
    toInt: true,
  },
  statusId: {
    optional: true,
    trim: true,
    toInt: true,
  },
  offset: {
    optional: true,
    trim: true,
    toInt: true,
  },
  limit: {
    optional: true,
    trim: true,
    toInt: true,
  },
  minStoredRecipes: {
    optional: true,
    trim: true,
    toInt: true,
  },
  maxStoredRecipes: {
    optional: true,
    trim: true,
    toInt: true,
  },
  minFavoriteRecipes: {
    optional: true,
    trim: true,
    toInt: true,
  },
  maxFavoriteRecipes: {
    optional: true,
    trim: true,
    toInt: true,
  },
  minCreatedRecipes: {
    optional: true,
    trim: true,
    toInt: true,
  },
  maxCreatedRecipes: {
    optional: true,
    trim: true,
    toInt: true,
  },
});

const updateProfileImageMiddleware = checkSchema({
  id: {
    in: ["params"],
    exists: validators.exists("id"),
    trim: true,
    notEmpty: validators.notEmpty("id"),
    isInt: validators.isInt("id"),
    custom: validators.existResourceById("id", User),
    // Sanitizers
    toInt: true,
  },
});

module.exports = {
  signinUserMiddleware,
  loginUserMiddleware,
  deleteUserMiddleware,
  getOneUserMiddleware,
  updateUserMiddleware,
  getAllUsersMiddleware,
  updateProfileImageMiddleware,
};
