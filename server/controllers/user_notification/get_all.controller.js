const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const { UserNotification, Sequelize } = require("../../../models/index");

const getAllController = (req, res) => {
  const Op = Sequelize.Op;

  const {
    subject,
    dateTimeSended,
    dateTimeViewed,
    fromCreatedAt,
    toCreatedAt,
    userId,
    offset,
    limit,
  } = req.query;

  UserNotification.findAll({
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
    ...(offset && {
      offset: offset,
    }),
    ...(limit && {
      limit: limit,
    }),
    order: [["createdAt", "DESC"]],
  })
    .then((userNotifications) =>
      userNotifications.map((e) => toResponseFormat(e.toJSON()))
    )
    .then((userNotifications) => {
      return res.status(success.ok).json({
        ok: true,
        userNotifications,
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
