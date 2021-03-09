const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const { UserNotification } = require("../../db/models/index");

/// Delete one UserNotification by Id
const deleteController = (req, res) => {
  const id = req.params.id;

  UserNotification.findByPk(id)
    .then((userNotification) => {
      return userNotification.destroy();
    })
    .then((userNotification) => toResponseFormat(userNotification.toJSON()))
    .then((userNotification) => {
      return res.status(success.ok).json({
        ok: true,
        userNotification,
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
