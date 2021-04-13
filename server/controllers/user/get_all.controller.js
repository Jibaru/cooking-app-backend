const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const { User, Sequelize, sequelize } = require("../../db/models/index");
const PaginationConstants = require("../../constants/pagination.contants");
/// Get all Users
const getAllController = (req, res) => {
  const Op = Sequelize.Op;

  const {
    firstName,
    lastName,
    fromCreatedAt,
    toCreatedAt,
    role,
    status,
    page = PaginationConstants.DEFAULT_PAGE,
    pageSize = PaginationConstants.PAGE_SIZE,
    minCreatedRecipes,
    maxCreatedRecipes,
    minFavoriteRecipes,
    maxFavoriteRecipes,
    minStoredRecipes,
    maxStoredRecipes,
  } = req.query;

  User.findAndCountAll({
    attributes: {
      exclude: ["password"],
      include: [
        "createdAt",
        [
          sequelize.literal(
            "(SELECT COUNT(*) FROM RecipeStores WHERE RecipeStores.userId = User.id)"
          ),
          "countStoredRecipes",
        ],
        [
          sequelize.literal(
            "(SELECT COUNT(*) FROM RecipeFavorites WHERE RecipeFavorites.userId = User.id)"
          ),
          "countFavoriteRecipes",
        ],
        [
          sequelize.literal(
            "(SELECT COUNT(*) FROM Recipes WHERE Recipes.createdById = User.id)"
          ),
          "countCreatedRecipes",
        ],
      ],
    },
    where: {
      // Filter firstName%
      ...(firstName && {
        firstName: {
          [Op.startsWith]: firstName,
        },
      }),
      // Filter lastName%
      ...(lastName && {
        lastName: {
          [Op.startsWith]: lastName,
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
      // Filter role
      ...(role && {
        role: {
          [Op.eq]: role,
        },
      }),
      // Filter status
      ...(status && {
        status: {
          [Op.eq]: status,
        },
      }),
    },
    group: ["id"],
    having: {
      ...((minStoredRecipes || maxStoredRecipes) && {
        countStoredRecipes: {
          ...(minStoredRecipes && {
            [Op.gte]: minStoredRecipes,
          }),
          ...(maxStoredRecipes && {
            [Op.lte]: maxStoredRecipes,
          }),
        },
      }),
      ...((minCreatedRecipes || maxCreatedRecipes) && {
        countCreatedRecipes: {
          ...(minCreatedRecipes && {
            [Op.gte]: minCreatedRecipes,
          }),
          ...(maxCreatedRecipes && {
            [Op.lte]: maxCreatedRecipes,
          }),
        },
      }),
      ...((minFavoriteRecipes || maxFavoriteRecipes) && {
        countFavoriteRecipes: {
          ...(minFavoriteRecipes && {
            [Op.gte]: minFavoriteRecipes,
          }),
          ...(maxFavoriteRecipes && {
            [Op.lte]: maxFavoriteRecipes,
          }),
        },
      }),
    },
    offset: page * pageSize - pageSize,
    limit: pageSize,
    order: [["createdAt", "DESC"]],
  })
    .then((result) => {
      return {
        totalUsers: result.count.length,
        users: result.rows.map((e) => toResponseFormat(e.toJSON())),
      };
    })
    .then(({ totalUsers, users }) => {
      const totalPages = Math.ceil(totalUsers / pageSize);

      return res.status(success.ok).json({
        ok: true,
        users,
        totalPages,
        currentPage: page,
        pageSize,
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
