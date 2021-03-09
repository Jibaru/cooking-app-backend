const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const { Equipment } = require("../../db/models/index");

/// Delete one Equipment by Id
const deleteController = (req, res) => {
  const id = req.params.id;

  Equipment.findByPk(id)
    .then((equipment) => {
      return equipment.destroy();
    })
    .then((equipment) => toResponseFormat(equipment.toJSON()))
    .then((equipment) => {
      return res.status(success.ok).json({
        ok: true,
        equipment,
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
