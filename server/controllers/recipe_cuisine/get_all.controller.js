const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const { RecipeCuisine, Sequelize, Recipe } = require("../../db/models/index");
const PaginationConstants = require("../../constants/pagination.contants");

/// Get all RecipeCuisines
const getAllController = (req, res) => {
  const Op = Sequelize.Op;

  const {
    name,
    region,
    recipeIds,
    fromCreatedAt,
    toCreatedAt,
    page = PaginationConstants.DEFAULT_PAGE,
    pageSize = PaginationConstants.PAGE_SIZE,
  } = req.query;

  RecipeCuisine.findAll({
    attributes: {
      include: ["createdAt"],
    },
    include: [
      {
        model: Recipe,
        as: "recipes",
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
      // Filter region
      ...(region && {
        region: {
          [Op.eq]: region,
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
    .then((recipeCuisines) => {
      function isInAllRecipes(recipes) {
        if (!recipeIds) {
          return true;
        }
        const queryRecipeIds = recipes.map(({ id }) => id);
        return recipeIds.every((recipeId) => queryRecipeIds.includes(recipeId));
      }

      const filteredRecipeCuisines = recipeCuisines.filter((recipeCuisine) =>
        isInAllRecipes(recipeCuisine.recipes)
      );

      const start = page * pageSize - pageSize;
      const end = start + pageSize;

      return {
        count: filteredRecipeCuisines.length,
        rows: filteredRecipeCuisines.slice(start, end),
      };
    })
    .then(({ count, rows }) => {
      return {
        totalRecipeCuisines: count,
        recipeCuisines: rows.map((e) => toResponseFormat(e.toJSON())),
      };
    })
    .then(({ totalRecipeCuisines, recipeCuisines }) => {
      const totalPages = Math.ceil(totalRecipeCuisines / pageSize);

      return res.status(success.ok).json({
        ok: true,
        recipeCuisines,
        totalPages,
        currentPage: page,
        pageSize,
        totalCount: totalRecipeCuisines,
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
