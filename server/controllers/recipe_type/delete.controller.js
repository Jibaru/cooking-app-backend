const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const { RecipeType } = require("../../db/models/index");

/// Delete one RecipeType by Id
const deleteController = (req, res) => {
  const id = req.params.id;

  RecipeType.findByPk(id)
    .then((recipeType) => {
      return recipeType.destroy();
    })
    .then((recipeType) => toResponseFormat(recipeType.toJSON()))
    .then((recipeType) => {
      return res.status(success.ok).json({
        ok: true,
        recipeType,
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
