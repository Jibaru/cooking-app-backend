const { toResponseFormat } = require("../../utils/response_formatter");
const { success, clientError } = require("../../utils/http_status_codes");
const { RecipeCuisine } = require("../../db/models/index");

/// Create one RecipeCuisine
const createController = (req, res) => {
  const { name, region } = req.body;

  RecipeCuisine.create({
    name,
    region,
  })
    .then((recipeCuisine) => toResponseFormat(recipeCuisine.toJSON()))
    .then((recipeCuisine) => {
      return res.status(success.created).json({
        ok: true,
        recipeCuisine,
      });
    })
    .catch((error) => {
      return res.status(clientError.badRequest).json({
        ok: false,
        error,
      });
    });
};

module.exports = createController;
