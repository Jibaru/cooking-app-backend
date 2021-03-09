const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const { Nutrient } = require("../../db/models/index");

/// Delete one Nutrient by Id
const deleteController = (req, res) => {
  const id = req.params.id;

  Nutrient.findByPk(id)
    .then((nutrient) => {
      return nutrient.destroy();
    })
    .then((nutrient) => toResponseFormat(nutrient.toJSON()))
    .then((nutrient) => {
      return res.status(success.ok).json({
        ok: true,
        nutrient,
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
