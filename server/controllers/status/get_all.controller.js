const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const { Status } = require("../../db/models/index");

/// Get all Statuses
const getAllController = (req, res) => {
  Status.findAll()
    .then((statuses) => statuses.map((e) => toResponseFormat(e.toJSON())))
    .then((statuses) => {
      return res.status(success.ok).json({
        ok: true,
        statuses,
      });
    })
    .catch((error) => {
      return res.status(clientError.badRequest).json({
        ok: false,
        error,
      });
    });
};

module.exports = getAllController;
