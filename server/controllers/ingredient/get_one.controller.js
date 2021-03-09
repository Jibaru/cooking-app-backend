const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const {
  Ingredient,
  Nutrient,
  IngredientCategory,
  Instruction,
  FileData,
} = require("../../db/models/index");

/// Get one Ingredient by Id
const getOneController = (req, res) => {
  const id = req.params.id;

  Ingredient.findByPk(id, {
    include: [
      {
        model: Nutrient,
        as: "nutrients",
        attributes: ["id", "name"],
        through: {
          as: "amount",
          attributes: ["units", "value"],
        },
      },
      {
        model: IngredientCategory,
        as: "ingredientCategories",
        attributes: ["id", "name", "description"],
        through: { attributes: [] },
      },
      {
        model: FileData,
        as: "image",
        attributes: ["id", "name", "content", "mimeType", "base64"],
      },
      {
        model: Instruction,
        as: "instructions",
        attributes: ["id"],
        through: { attributes: [] },
      },
    ],
  })
    .then((ingredient) => toResponseFormat(ingredient.toJSON()))
    .then((ingredient) => {
      return res.status(success.ok).json({
        ok: true,
        ingredient,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(clientError.badRequest).json({
        ok: false,
        error,
      });
    });
};

module.exports = getOneController;
