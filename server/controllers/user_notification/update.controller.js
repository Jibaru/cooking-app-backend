const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const { UserNotification } = require("../../../models/index");

/// Update one UserNotification by Id
const updateController = (req, res) => {
  const id = req.params.id;

  const { subject, content, dateTimeViewed } = req.body;

  UserNotification.update(
    {
      subject,
      content,
      dateTimeViewed,
    },
    {
      where: {
        id,
      },
    }
  )
    .then((_) =>
      UserNotification.findByPk(id, {
        attributes: [
          ...(!!subject ? ["subject"] : []),
          ...(!!content ? ["content"] : []),
          ...(!!dateTimeViewed ? ["dateTimeViewed"] : []),
        ],
      })
    )
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

module.exports = updateController;
