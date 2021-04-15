const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const { Equipment, Sequelize, Instruction } = require("../../db/models/index");
const PaginationConstants = require("../../constants/pagination.contants");

// Get all Equipments
const getAllController = (req, res) => {
  const Op = Sequelize.Op;

  const {
    name,
    status,
    recipeIds,
    fromCreatedAt,
    toCreatedAt,
    page = PaginationConstants.DEFAULT_PAGE,
    pageSize = PaginationConstants.PAGE_SIZE,
  } = req.query;

  Equipment.findAll({
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
    .then((equipments) => {
      // Check if an equipment has all recipeIds
      // If recipeIds is empty or not exists, return true
      function isInAllRecipes(instructions) {
        if (!recipeIds) {
          return true;
        }
        const instructionIds = instructions.map(({ id }) => id);
        return recipeIds.every((recipeId) => instructionIds.includes(recipeId));
      }

      const filteredEquipments = equipments.filter((equipment) =>
        isInAllRecipes(equipment.instructions)
      );

      const start = page * pageSize - pageSize;
      const end = offset + pageSize;

      return {
        count: filteredEquipments.length,
        rows: filteredEquipments.slice(start, end),
      };
    })
    .then(({ count, rows }) => {
      return {
        totalEquipments: count,
        equipments: rows.map((e) => toResponseFormat(e.toJSON())),
      };
    })
    .then(({ totalEquipments, equipments }) => {
      const totalPages = Math.ceil(totalEquipments / pageSize);

      return res.status(success.ok).json({
        ok: true,
        equipments,
        totalPages,
        currentPage: page,
        pageSize,
        totalCount: totalEquipments,
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
