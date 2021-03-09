const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const { RecipeCuisine } = require("../../db/models/index");

/// Get all RecipeCuisines
const getAllController = (req, res) => {
  RecipeCuisine.findAll()
    .then((recipeCuisines) =>
      recipeCuisines.map((e) => toResponseFormat(e.toJSON()))
    )
    .then((recipeCuisines) => {
      return res.status(success.ok).json({
        ok: true,
        recipeCuisines,
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
