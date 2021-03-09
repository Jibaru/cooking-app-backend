const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const { Ingredient } = require("../../db/models/index");

// Get all Ingredients
const getAllController = (req, res) => {
  Ingredient.findAll()
    .then((ingredients) => ingredients.map((e) => toResponseFormat(e.toJSON())))
    .then((ingredients) => {
      return res.status(success.ok).json({
        ok: true,
        ingredients,
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
