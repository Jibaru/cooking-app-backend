const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const { UserNotification, Sequelize } = require("../../db/models/index");
const PaginationConstants = require("../../constants/pagination.contants");

const getAllController = (req, res) => {
  const Op = Sequelize.Op;

  const {
    subject,
    dateTimeSended,
    dateTimeViewed,
    fromCreatedAt,
    toCreatedAt,
    userId,
    page = PaginationConstants.DEFAULT_PAGE,
    pageSize = PaginationConstants.PAGE_SIZE,
  } = req.query;

  UserNotification.findAndCountAll({
    where: {
      // Filter subject%
      ...(subject && {
        subject: {
          [Op.startsWith]: subject,
        },
      }),
      // Filter dateTimeSended
      ...(dateTimeSended && {
        dateTimeSended: {
          [Op.eq]: dateTimeSended,
        },
      }),
      // Filter dateTimeViewed
      ...(dateTimeViewed && {
        dateTimeViewed: {
          [Op.eq]: dateTimeViewed,
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
      // Filter userId
      ...(userId && {
        userId: {
          [Op.eq]: userId,
        },
      }),
    },
    offset: page * pageSize - pageSize,
    limit: pageSize,
    order: [["createdAt", "DESC"]],
  })
    .then((result) => {
      return {
        totalUserNotifications: result.count.length,
        userNotifications: result.rows.map((e) => toResponseFormat(e.toJSON())),
      };
    })
    .then(({ totalUserNotifications, userNotifications }) => {
      const totalPages = Math.ceil(totalUserNotifications / pageSize);

      return res.status(success.ok).json({
        ok: true,
        userNotifications,
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
