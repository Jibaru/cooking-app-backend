const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const { RecipeCuisine, Recipe } = require("../../db/models/index");

/// Get one RecipeCuisine by Id
const getOneController = (req, res) => {
  const id = req.params.id;

  RecipeCuisine.findByPk(id, {
    include: [
      {
        model: Recipe,
        as: "recipes",
        attributes: ["id", "title"],
      },
    ],
  })
    .then((recipeCuisine) => toResponseFormat(recipeCuisine.toJSON()))
    .then((recipeCuisine) => {
      return res.status(success.ok).json({
        ok: true,
        recipeCuisine,
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
