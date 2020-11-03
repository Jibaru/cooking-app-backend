const { toResponseFormat } = require('../../utils/response_formatter');
const { success, clientError } = require('../../utils/http_status_codes');
const { RecipeType } = require('../../../models/index');

/// Create one RecipeType
const createController = (req, res) => {

    const {
        name,
        description
    } = req.body;

    RecipeType
    .create({
        name,
        description
    })
    .then(recipeType => toResponseFormat(recipeType.toJSON()))
    .then(recipeType => {
        return res.status(success.ok).json({
            ok: true,
            recipeType
        });
    })
    .catch(error => {
        return res.status(clientError.badRequest).json({
            ok: false,
            error
        });
    });

};

module.exports = createController;