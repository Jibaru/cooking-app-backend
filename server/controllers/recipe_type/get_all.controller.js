const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const { RecipeType, Sequelize, Recipe } = require("../../db/models/index");
const PaginationConstants = require("../../constants/pagination.contants");

/// Get all RecipeTypes
const getAllController = (req, res) => {
  const Op = Sequelize.Op;

  const {
    name,
    recipeIds,
    fromCreatedAt,
    toCreatedAt,
    page = PaginationConstants.DEFAULT_PAGE,
    pageSize = PaginationConstants.PAGE_SIZE,
  } = req.query;

  RecipeType.findAll({
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
    .then((recipeTypes) => {
      function isInAllRecipes(recipes) {
        if (!recipeIds) {
          return true;
        }
        const queryRecipeIds = recipes.map(({ id }) => id);
        return recipeIds.every((recipeId) => queryRecipeIds.includes(recipeId));
      }

      const filteredRecipeTypes = recipeTypes.filter((recipeType) =>
        isInAllRecipes(recipeType.recipes)
      );

      const start = page * pageSize - pageSize;
      const end = start + pageSize;

      return {
        count: filteredRecipeTypes.length,
        rows: filteredRecipeTypes.slice(start, end),
      };
    })
    .then(({ count, rows }) => {
      return {
        totalRecipeTypes: count,
        recipeTypes: rows.map((e) => toResponseFormat(e.toJSON())),
      };
    })
    .then(({ totalRecipeTypes, recipeTypes }) => {
      const totalPages = Math.ceil(totalRecipeTypes / pageSize);

      return res.status(success.ok).json({
        ok: true,
        recipeTypes,
        totalPages,
        currentPage: page,
        pageSize,
        totalCount: totalRecipeTypes,
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
