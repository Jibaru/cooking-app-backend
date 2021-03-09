const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const { Equipment } = require("../../db/models/index");

// Get all Equipments
const getAllController = (req, res) => {
  Equipment.findAll()
    .then((equipments) => equipments.map((e) => toResponseFormat(e.toJSON())))
    .then((equipments) => {
      return res.status(success.ok).json({
        ok: true,
        equipments,
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
