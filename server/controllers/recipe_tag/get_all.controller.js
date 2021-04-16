const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const { RecipeTag, Sequelize, Recipe } = require("../../db/models/index");
const PaginationConstants = require("../../constants/pagination.contants");

/// Get all RecipeTags
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

  RecipeTag.findAll({
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
    .then((recipeTags) => {
      function isInAllRecipes(recipes) {
        if (!recipeIds) {
          return true;
        }
        const queryRecipeIds = recipes.map(({ id }) => id);
        return recipeIds.every((recipeId) => queryRecipeIds.includes(recipeId));
      }

      const filteredRecipeTags = recipeTags.filter((recipeTag) =>
        isInAllRecipes(recipeTag.recipes)
      );

      const start = page * pageSize - pageSize;
      const end = start + pageSize;

      return {
        count: filteredRecipeTags.length,
        rows: filteredRecipeTags.slice(start, end),
      };
    })
    .then(({ count, rows }) => {
      return {
        totalRecipeTags: count,
        recipeTags: rows.map((e) => toResponseFormat(e.toJSON())),
      };
    })
    .then(({ totalRecipeTags, recipeTags }) => {
      const totalPages = Math.ceil(totalRecipeTags / pageSize);

      return res.status(success.ok).json({
        ok: true,
        recipeTags,
        totalPages,
        currentPage: page,
        pageSize,
        totalCount: totalRecipeTags,
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
