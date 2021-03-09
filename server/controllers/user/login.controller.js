const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const {
  User,
  FileData,
  Role,
  Recipe,
  UserNotification,
  Status,
} = require("../../db/models/index");

/// Authenticate User by email (or username) and password
/// Returns a JWT for some request
const loginController = (req, res) => {
  const { email } = req.body;

  User.findOne({
    where: {
      email,
    },
    attributes: {
      exclude: ["roleId", "profileImageId", "password", "statusId"],
    },
    include: [
      {
        model: FileData,
        as: "profileImage",
        attributes: ["id", "name", "mimeType", "content", "base64"],
      },
      {
        model: Role,
        as: "role",
      },
      {
        model: Recipe,
        as: "storedRecipes",
        attributes: ["id", "title"],
        through: {
          as: "information",
          attributes: ["dateTimeStored"],
        },
      },
      {
        model: Recipe,
        as: "favoriteRecipes",
        attributes: ["id", "title"],
        through: {
          as: "information",
          attributes: ["dateTimeLiked"],
        },
      },
      {
        model: Recipe,
        as: "rankingRecipes",
        attributes: ["id", "title"],
        through: {
          as: "information",
          attributes: ["score", "timesVisited"],
        },
      },
      {
        model: Recipe,
        as: "createdRecipes",
        attributes: ["id", "title"],
      },
      {
        model: UserNotification,
        as: "userNotifications",
        attributes: {
          exclude: ["userId"],
        },
      },
      {
        model: Status,
        as: "status",
      },
    ],
  })
    .then((user) => toResponseFormat(user.toJSON()))
    .then((user) => {
      let token = jwt.sign(
        {
          User: user,
        },
        process.env.SEED,
        { expiresIn: process.env.TOKEN_EXPIRES }
      );

      return res.status(success.ok).json({
        ok: true,
        user,
        token,
      });
    })
    .catch((error) => {
      return res.status(clientError.badRequest).json({
        ok: false,
        error,
      });
    });
};

module.exports = loginController;
