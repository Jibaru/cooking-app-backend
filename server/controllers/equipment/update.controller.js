const fs = require("fs");
const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const { Equipment, FileData, sequelize } = require("../../db/models/index");

/// Update one Equipment by Id
const updateController = (req, res) => {
  const id = req.params.id;
  const { name, description, statusId } = req.body;
  const image = req.file;

  sequelize
    .transaction((t) => {
      return Equipment.update(
        {
          name,
          description,
          statusId,
        },
        {
          where: {
            id,
          },
          transaction: t,
        }
      )
        .then((_) => {
          return Equipment.findByPk(id, { transaction: t });
        })
        .then((equipment) => {
          if (!!image) {
            return FileData.findByPk(equipment.imageId, {
              transaction: t,
            }).then((fileData) => {
              return fileData.update(
                {
                  name: image.originalname,
                  mimeType: image.mimetype,
                  content: fs.readFileSync(image.path),
                },
                {
                  transaction: t,
                }
              );
            });
          }
        });
    })
    .then((_) =>
      Equipment.findByPk(id, {
        attributes: [
          ...(!!name ? ["name"] : []),
          ...(!!description ? ["description"] : []),
          ...(!!statusId ? ["statusId"] : []),
        ],
        include: [
          ...(!!image
            ? [
                {
                  model: FileData,
                  as: "image",
                },
              ]
            : []),
        ],
      })
    )
    .then((equipment) => toResponseFormat(equipment.toJSON()))
    .then((equipment) => {
      return res.status(success.ok).json({
        ok: true,
        equipment,
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

module.exports = updateController;
