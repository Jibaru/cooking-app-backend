const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const { UserNotification } = require("../../db/models/index");

/// Create one UserNotification
const createController = (req, res) => {
  const { subject, content, dateTimeSended, userId } = req.body;

  UserNotification.create({
    subject,
    content,
    dateTimeSended,
    userId,
  })
    .then((userNotification) => toResponseFormat(userNotification.toJSON()))
    .then((userNotification) => {
      return res.status(success.created).json({
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

module.exports = createController;
