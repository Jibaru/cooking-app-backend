const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const {
  IngredientCategory,
  Sequelize,
  Ingredient,
} = require("../../db/models/index");
const PaginationConstants = require("../../constants/pagination.contants");

/// Get all IngredientCategories
const getAllController = (req, res) => {
  const Op = Sequelize.Op;

  const {
    name,
    ingredientIds,
    fromCreatedAt,
    toCreatedAt,
    page = PaginationConstants.DEFAULT_PAGE,
    pageSize = PaginationConstants.PAGE_SIZE,
  } = req.query;

  IngredientCategory.findAll({
    attributes: {
      include: ["createdAt"],
    },
    include: [
      {
        model: Ingredient,
        as: "ingredients",
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
    .then((ingredientCategories) => {
      // Check if an ingredientCategory has all ingredientIds
      // If ingredientIds is empty or not exists, return true
      function isInAllIngredients(ingredients) {
        if (!ingredientIds) {
          return true;
        }
        const queryIngredientIds = ingredients.map(({ id }) => id);
        return ingredientIds.every((ingredientId) =>
          queryIngredientIds.includes(ingredientId)
        );
      }

      const filteredIngredientCategories = ingredientCategories.filter((ic) =>
        isInAllIngredients(ic.ingredients)
      );

      const start = page * pageSize - pageSize;
      const end = start + pageSize;

      return {
        count: filteredIngredientCategories.length,
        rows: filteredIngredientCategories.slice(start, end),
      };
    })
    .then(({ count, rows }) => {
      return {
        totalIngredientCategories: count,
        ingredientCategories: rows.map((e) => toResponseFormat(e.toJSON())),
      };
    })
    .then(({ totalIngredientCategories, ingredientCategories }) => {
      const totalPages = Math.ceil(totalIngredientCategories / pageSize);

      return res.status(success.ok).json({
        ok: true,
        ingredientCategories,
        totalPages,
        currentPage: page,
        pageSize,
        totalCount: totalIngredientCategories,
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

module.exports = getAllController;
