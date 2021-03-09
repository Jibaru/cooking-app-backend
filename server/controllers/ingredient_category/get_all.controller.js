const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const { IngredientCategory } = require("../../db/models/index");

/// Get all IngredientCategories
const getAllController = (req, res) => {
  IngredientCategory.findAll()
    .then((ingredientCategories) =>
      ingredientCategories.map((e) => toResponseFormat(e.toJSON()))
    )
    .then((ingredientCategories) => {
      return res.status(success.ok).json({
        ok: true,
        ingredientCategories,
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
