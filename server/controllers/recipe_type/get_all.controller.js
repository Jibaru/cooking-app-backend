const { toResponseFormat } = require('../../utils/response_formatter');
const { success, clientError } = require('../../utils/http_status_codes');
const { RecipeType } = require('../../../models/index');

/// Get all RecipeTypes
const getAllController = (req, res) => {

    RecipeType
    .findAll()
    .then(recipeTypes => recipeTypes.map(e => toResponseFormat(e.toJSON())))
    .then(recipeTypes => {
        return res.status(success.ok).json({
            ok: true,
            recipeTypes
        });
    })
    .catch(error => {
        return res.status(clientError.badRequest).json({
            ok: false,
            error
        });
    });

};

module.exports = getAllController;