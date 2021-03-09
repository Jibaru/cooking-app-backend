const fs = require("fs");
const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const { Equipment, FileData, sequelize } = require("../../db/models/index");

/// Create one Equipment
const createController = (req, res) => {
  const { name, description } = req.body;
  const image = req.file;

  sequelize
    .transaction((t) => {
      return FileData.create(
        {
          name: image.originalname,
          mimeType: image.mimetype,
          content: fs.readFileSync(image.path),
        },
        { transaction: t }
      ).then((fileData) => {
        return Equipment.create(
          {
            imageId: fileData.id,
            name,
            description,
          },
          { transaction: t }
        );
      });
    })
    .then((equipment) => toResponseFormat(equipment.toJSON()))
    .then((equipment) => {
      return res.status(success.created).json({
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

module.exports = createController;
