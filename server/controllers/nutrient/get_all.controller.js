const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const { Nutrient, Sequelize, Ingredient } = require("../../db/models/index");
const PaginationConstants = require("../../constants/pagination.contants");

/// Get all Nutrients
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

  Nutrient.findAll({
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
        through: {
          as: "amountOf",
          attributes: ["units", "value"],
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

    .then((nutrients) => {
      function isInAllIngredients(ingredients) {
        if (!ingredientIds) {
          return true;
        }
        const queryIngredientIds = ingredients.map(({ id }) => id);
        return ingredientIds.every((ingredientId) =>
          queryIngredientIds.includes(ingredientId)
        );
      }

      const filteredNutrients = nutrients.filter((nutrient) =>
        isInAllIngredients(nutrient.ingredients)
      );

      const start = page * pageSize - pageSize;
      const end = start + pageSize;

      return {
        count: filteredNutrients.length,
        rows: filteredNutrients.slice(start, end),
      };
    })
    .then(({ count, rows }) => {
      return {
        totalNutrients: count,
        nutrients: rows.map((e) => toResponseFormat(e.toJSON())),
      };
    })
    .then(({ totalNutrients, nutrients }) => {
      const totalPages = Math.ceil(totalNutrients / pageSize);

      return res.status(success.ok).json({
        ok: true,
        nutrients,
        totalPages,
        currentPage: page,
        pageSize,
        totalCount: totalNutrients,
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
