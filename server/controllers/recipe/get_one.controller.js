const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const {
  Recipe,
  RecipeCuisine,
  RecipeTag,
  FileData,
  Instruction,
  Ingredient,
  Step,
  Equipment,
  User,
} = require("../../db/models/index");

/// Get one Recipe by Id
const getOneController = (req, res) => {
  const id = req.params.id;

  Recipe.findByPk(id, {
    attributes: {
      exclude: [
        "recipeCuisineId",
        "recipeTypeId",
        "createdById",
        "instructionId",
      ],
    },
    include: [
      {
        model: User,
        as: "createdBy",
        attributes: {
          exclude: ["password", "roleId", "profileImageId", "email"],
        },
        include: [
          {
            model: FileData,
            as: "profileImage",
            attributes: ["id", "name", "content", "mimeType", "base64"],
          },
        ],
      },
      {
        model: FileData,
        as: "recipeImage",
        attributes: ["id", "name", "content", "mimeType", "base64"],
      },
      {
        model: RecipeCuisine,
        as: "recipeCuisine",
      },
      {
        model: RecipeTag,
        as: "recipeTag",
        through: { attributes: [] },
      },
      {
        model: Instruction,
        as: "instruction",
        include: [
          {
            model: Ingredient,
            as: "ingredients",
            attributes: ["id", "name", "description"],
            through: {
              as: "amount",
              attributes: ["value", "units"],
            },
            include: [
              {
                model: FileData,
                as: "image",
                attributes: ["id", "name", "content", "mimeType", "base64"],
              },
            ],
          },
          {
            model: Equipment,
            as: "equipments",
            attributes: ["id", "name", "description"],
            include: [
              {
                model: FileData,
                as: "image",
                attributes: ["id", "name", "content", "mimeType", "base64"],
              },
            ],
            through: { attributes: [] },
          },
          {
            model: Step,
            as: "steps",
            attributes: ["id", "orderNumber", "content"],
            include: [
              {
                model: FileData,
                as: "stepImage",
                attributes: ["id", "name", "content", "mimeType", "base64"],
              },
            ],
          },
        ],
      },
    ],
  })
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

module.exports = getOneController;
