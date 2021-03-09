const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const {
  Equipment,
  Instruction,
  FileData,
  Status,
} = require("../../db/models/index");

/// Get one Equipment by Id
const getOneController = (req, res) => {
  const id = req.params.id;

  Equipment.findByPk(id, {
    attributes: {
      exclude: ["imageId", "statusId"],
    },
    include: [
      {
        model: Instruction,
        as: "instructions",
        attributes: ["id"],
        through: { attributes: [] },
      },
      {
        model: FileData,
        as: "image",
        attributes: ["id", "name", "content", "mimeType", "base64"],
      },
      {
        model: Status,
        as: "status",
        attributes: ["id", "name"],
      },
    ],
  })
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

module.exports = getOneController;
