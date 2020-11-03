const { toResponseFormat } = require('../../utils/response_formatter');
const { success, clientError } = require('../../utils/http_status_codes');
const { RecipeStatus } = require('../../../models/index');

/// Get all RecipeStatuses
const getAllController = (req, res) => {

    RecipeStatus
    .findAll()
    .then(recipeStatuses => recipeStatuses.map(e => toResponseFormat(e.toJSON())))
    .then(recipeStatuses => {
        return res.status(success.ok).json({
            ok: true,
            recipeStatuses
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