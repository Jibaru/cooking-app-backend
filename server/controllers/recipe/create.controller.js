const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const { Recipe } = require("../../db/models/index");

/// Create one Recipe
const createController = (req, res) => {
  const {
    dateTimePublished,
    title,
    description,
    yield,
    prepTime,
    cookTime,
    recipeImageId,
    createdById,
    recipeCuisineId,
    recipeTypeId,
  } = req.body;

  Recipe.create({
    dateTimePublished,
    title,
    description,
    yield,
    prepTime,
    cookTime,
    recipeImageId,
    createdById,
    recipeCuisineId,
    recipeTypeId,
  })
    .then((recipe) => toResponseFormat(recipe.toJSON()))
    .then((recipe) => {
      return res.status(success.created).json({
        ok: true,
        recipe,
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
