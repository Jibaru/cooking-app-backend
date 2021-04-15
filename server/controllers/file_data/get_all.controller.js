const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const { FileData, Sequelize } = require("../../db/models/index");
const PaginationConstants = require("../../constants/pagination.contants");

// Get all FileDatas
const getAllController = (req, res) => {
  const Op = Sequelize.Op;

  const {
    name,
    mimeType,
    fromCreatedAt,
    toCreatedAt,
    page = PaginationConstants.DEFAULT_PAGE,
    pageSize = PaginationConstants.PAGE_SIZE,
  } = req.query;

  FileData.findAndCountAll({
    attributes: {
      include: ["createdAt"],
    },
    where: {
      // Filter name%
      ...(name && {
        name: {
          [Op.startsWith]: name,
        },
      }),
      // Filter mimeType
      ...(mimeType && {
        mimeType: {
          [Op.eq]: mimeType,
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
    offset: page * pageSize - pageSize,
    limit: pageSize,
    order: [["createdAt", "DESC"]],
  })
    .then(({ count, rows }) => {
      return {
        totalFileDatas: count,
        fileDatas: rows.map((e) => toResponseFormat(e.toJSON())),
      };
    })
    .then(({ totalFileDatas, fileDatas }) => {
      const totalPages = Math.ceil(totalFileDatas / pageSize);

      return res.status(success.ok).json({
        ok: true,
        fileDatas,
        totalPages,
        currentPage: page,
        pageSize,
        totalCount: totalFileDatas,
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
