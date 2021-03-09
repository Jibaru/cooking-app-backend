const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const { Step, Instruction, FileData } = require("../../db/models/index");

/// Get one Step by Id
const getOneController = (req, res) => {
  const id = req.params.id;

  Step.findByPk(id, {
    attributes: {
      exclude: ["instructionId", "stepImageId"],
    },
    include: [
      {
        model: Instruction,
        as: "instruction",
        attributes: ["id"],
      },
      {
        model: FileData,
        as: "stepImage",
        attributes: ["id", "name", "mimeType", "content", "base64"],
      },
    ],
  })
    .then((step) => toResponseFormat(step.toJSON()))
    .then((step) => {
      return res.status(success.ok).json({
        ok: true,
        step,
      });
    })
    .catch((error) => {
      return res.status(clientError.badRequest).json({
        ok: false,
        error,
      });
    });
};

module.exports = getOneController;
