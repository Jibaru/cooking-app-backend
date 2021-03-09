const fs = require("fs");
const path = require("path");
const assetsDir = path.resolve("resources/static/assets/images");
const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const { User, FileData, sequelize } = require("../../db/models/index");

const updateProfileImageController = (req, res) => {
  const id = req.params.id;

  const file = req.file;

  sequelize.transaction((t) => {
    return User.findByPk(id, {
      attributes: {
        include: ["profileImageId"],
      },
      transaction: t,
    })
      .then((user) => {
        if (!!user.profileImageId) {
          return FileData.findByPk(user.profileImageId)
            .then((fileData) => {
              return fileData.update(
                {
                  name: file.originalname,
                  mimeType: file.mimetype,
                  content: fs.readFileSync(assetsDir + `\\${file.filename}`),
                },
                { transaction: t }
              );
            })
            .then((_) => {
              return FileData.findByPk(user.profileImageId, { transaction: t });
            });
        }

        return FileData.create(
          {
            name: file.originalname,
            mimeType: file.mimetype,
            content: fs.readFileSync(assetsDir + `\\${file.filename}`),
          },
          { transaction: t }
        ).then((fileData) => {
          return user
            .update(
              {
                profileImageId: fileData.id,
              },
              { transaction: t }
            )
            .then((_) => {
              return FileData.findByPk(fileData.id, { transaction: t });
            });
        });
      })
      .then((fileData) => toResponseFormat(fileData.toJSON()))
      .then((fileData) => {
        return res.status(success.ok).json({
          ok: true,
          fileData,
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(clientError.badRequest).json({
          ok: false,
          error,
        });
      });
  });
};

module.exports = updateProfileImageController;
