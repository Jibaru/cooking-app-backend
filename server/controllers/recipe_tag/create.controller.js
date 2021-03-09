const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const { RecipeTag } = require("../../db/models/index");

/// Create one RecipeTag
const createController = (req, res) => {
  const { name } = req.body;

  RecipeTag.create({
    name,
  })
    .then((recipeTag) => toResponseFormat(recipeTag.toJSON()))
    .then((recipeTag) => {
      return res.status(success.created).json({
        ok: true,
        recipeTag,
      });
    })
    .catch((error) => {
      return res.status(clientError.badRequest).json({
        ok: false,
        error,
      });
    });
};

module.exports = createController;
