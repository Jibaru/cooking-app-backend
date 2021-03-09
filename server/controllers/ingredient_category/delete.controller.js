const { IngredientCategory } = require("../../db/models/index");
const { success, clientError } = require("../../utils/http_status_codes");
const { toResponseFormat } = require("../../utils/response_formatter");

/// Delete one IngredientCategory by Id
const deleteController = (req, res) => {
  const id = req.params.id;

  IngredientCategory.findByPk(id)
    .then((ingredientCategory) => {
      return ingredientCategory.destroy();
    })
    .then((ingredientCategory) => toResponseFormat(ingredientCategory.toJSON()))
    .then((ingredientCategory) => {
      return res.status(success.ok).json({
        ok: true,
        ingredientCategory,
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
