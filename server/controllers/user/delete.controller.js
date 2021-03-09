const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const { User, UserNotification } = require("../../db/models/index");

/// Delete one User by Id
const deleteController = (req, res) => {
  const id = req.params.id;

  User.findByPk(id, {
    attributes: {
      exclude: ["password"],
    },
    include: [
      {
        model: UserNotification,
        as: "userNotifications",
        attributes: {
          exclude: ["userId"],
        },
      },
    ],
  })
    .then((user) => {
      return user.destroy();
    })
    .then((user) => toResponseFormat(user.toJSON()))
    .then((user) => {
      return res.success(success.ok).json({
        ok: true,
        user,
      });
    })
    .catch((error) => {
      return res.status(clientError.badRequest).json({
        ok: false,
        error,
      });
    });
};

module.exports = deleteController;
