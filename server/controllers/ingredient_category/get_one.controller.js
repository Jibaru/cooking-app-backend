const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const { IngredientCategory, Ingredient } = require("../../db/models/index");

/// Get one IngredientCategory by Id
const getOneController = (req, res) => {
  const id = req.params.id;

  IngredientCategory.findByPk(id, {
    include: [
      {
        model: Ingredient,
        as: "ingredients",
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
    ],
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

module.exports = getOneController;
