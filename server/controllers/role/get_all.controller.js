const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const { Role } = require("../../db/models/index");

const getAllController = (req, res) => {
  Role.findAll()
    .then((roles) => roles.map((e) => toResponseFormat(e.toJSON())))
    .then((roles) => {
      return res.status(success.ok).json({
        ok: true,
        roles,
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
