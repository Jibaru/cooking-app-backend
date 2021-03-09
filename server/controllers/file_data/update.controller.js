const fs = require("fs");
const path = require("path");
const assetsDir = path.resolve("resources/static/assets/images");
const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const { FileData } = require("../../db/models/index");

/// Update one FileData by Id
const updateController = async (req, res) => {
  const id = req.params.id;

  const file = req.file;
  console.log(file.filename);

  FileData.findByPk(id)
    .then((fileData) => {
      return fileData.update({
        name: file.originalname,
        mimeType: file.mimetype,
        content: fs.readFileSync(assetsDir + `\\${file.filename}`),
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
};

module.exports = updateController;
