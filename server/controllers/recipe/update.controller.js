const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const { Recipe } = require("../../db/models/index");

/// Update one Recipe by Id
const updateController = (req, res) => {
  const id = req.params.id;

  const {
    title,
    description,
    prepTime,
    cookTime,
    recipeImageId,
    status,
    instructionId,
    recipeCuisineId,
    recipeTypeId,
  } = req.body;

  const yieldPersons = req.body.yield;

  Recipe.update(
    {
      title,
      description,
      yield: yieldPersons,
      prepTime,
      cookTime,
      recipeImageId,
      status,
      recipeCuisineId,
      recipeTypeId,
    },
    {
      where: {
        id,
      },
    }
  )
    .then((_) =>
      Recipe.findByPk(id, {
        attributes: [
          ...(!!title ? ["title"] : []),
          ...(!!description ? ["description"] : []),
          ...(!!yieldPersons ? ["yield"] : []),
          ...(!!prepTime ? ["prepTime"] : []),
          ...(!!cookTime ? ["cookTime"] : []),
          ...(!!recipeImageId ? ["recipeImageId"] : []),
          ...(!!status ? ["status"] : []),
          ...(!!recipeCuisineId ? ["recipeCuisineId"] : []),
          ...(!!recipeTypeId ? ["recipeTypeId"] : []),
        ],
      })
    )
    .then((recipe) => toResponseFormat(recipe.toJSON()))
    .then((recipe) => {
      return res.status(success.ok).json({
        ok: true,
        recipe,
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

module.exports = updateController;
