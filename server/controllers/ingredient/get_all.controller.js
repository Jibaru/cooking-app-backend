const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const {
  Ingredient,
  Instruction,
  Nutrient,
  IngredientCategory,
  Sequelize,
} = require("../../db/models/index");
const PaginationConstants = require("../../constants/pagination.contants");

// Get all Ingredients
const getAllController = (req, res) => {
  const Op = Sequelize.Op;

  const {
    name,
    status,
    recipeIds,
    nutrientIds,
    ingredientCategoryIds,
    fromCreatedAt,
    toCreatedAt,
    page = PaginationConstants.DEFAULT_PAGE,
    pageSize = PaginationConstants.PAGE_SIZE,
  } = req.query;

  Ingredient.findAll({
    attributes: {
      include: ["createdAt"],
    },
    include: [
      {
        model: Instruction,
        as: "instructions",
        attributes: {
          include: ["id"],
        },
      },
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
        attributes: {
          include: ["id"],
        },
      },
    ],
    where: {
      // Filter name%
      ...(name && {
        name: {
          [Op.startsWith]: name,
        },
      }),
      // Filter status
      ...(status && {
        status: {
          [Op.eq]: status,
        },
      }),
      // Filter from X to Y createdAt
      ...((fromCreatedAt || toCreatedAt) && {
        createdAt: {
          ...(fromCreatedAt && {
            [Op.gte]: fromCreatedAt,
          }),
          ...(toCreatedAt && {
            [Op.lte]: toCreatedAt,
          }),
        },
      }),
    },
    order: [["createdAt", "DESC"]],
  })
    .then((ingredients) => {
      function isInAllRecipes(instructions) {
        if (!recipeIds) {
          return true;
        }
        const instructionIds = instructions.map(({ id }) => id);
        return recipeIds.every((recipeId) => instructionIds.includes(recipeId));
      }

      function isInAllNutrients(nutrients) {
        if (!nutrientIds) {
          return true;
        }
        const queryNutrientIds = nutrients.map(({ id }) => id);
        return nutrientIds.every((nutrientId) =>
          queryNutrientIds.includes(nutrientId)
        );
      }

      function isInAllIngredientCategories(ingredientCategories) {
        if (!ingredientCategoryIds) {
          return true;
        }
        const queryIngredientCategoryIds = ingredientCategories.map(
          ({ id }) => id
        );
        return ingredientCategoryIds.every((ingredientCategoryId) =>
          queryIngredientCategoryIds.includes(ingredientCategoryId)
        );
      }

      const filteredIngredients = ingredients.filter(
        (ingredient) =>
          isInAllRecipes(ingredient.instructions) &&
          isInAllNutrients(ingredient.nutrients) &&
          isInAllIngredientCategories(ingredient.ingredientCategories)
      );

      const start = page * pageSize - pageSize;
      const end = start + pageSize;

      return {
        count: filteredIngredients.length,
        rows: filteredIngredients.slice(start, end),
      };
    })
    .then(({ count, rows }) => {
      return {
        totalIngredients: count,
        ingredients: rows.map((e) => toResponseFormat(e.toJSON())),
      };
    })
    .then(({ totalIngredients, ingredients }) => {
      const totalPages = Math.ceil(totalIngredients / pageSize);

      return res.status(success.ok).json({
        ok: true,
        ingredients,
        totalPages,
        currentPage: page,
        pageSize,
        totalCount: totalIngredients,
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
