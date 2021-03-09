const bcrypt = require("bcrypt");
const { toResponseFormat } = require("../../utils/response_formatter");
const { generateRandomString } = require("../../utils/random");
const { success, clientError } = require("../../utils/http_status_codes");
const { User, FileData, Role, Status } = require("../../db/models/index");

/// Create one User with NORMAL Role
/// Default imageProfile, and no username is not provided
const signinController = (req, res) => {
  const {
    profileImageId,
    firstName,
    lastName,
    nickName,
    email,
    password,
  } = req.body;

  User.create({
    verificationCode: generateRandomString(6),
    profileImageId,
    firstName,
    lastName,
    nickName,
    email,
    password: bcrypt.hashSync(password, 10),
  })
    .then((user) => {
      return User.findByPk(user.id, {
        attributes: {
          exclude: ["password", "profileImageId"],
        },
        include: [
          {
            model: FileData,
            as: "profileImage",
            attributes: ["id", "name", "mimeType", "content", "base64"],
          },
        ],
      });
    })
    .then((user) => toResponseFormat(user.toJSON()))
    .then((user) => {
      return res.status(success.created).json({
        ok: true,
        user,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(clientError.badRequest).json({
        ok: false,
        error,
      });
    });
};

module.exports = signinController;
