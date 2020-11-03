const { toResponseFormat } = require('../../utils/response_formatter');
const { success, clientError } = require('../../utils/http_status_codes');
const { Recipe } = require('../../../models/index');

/// Get all Recipes
const getAllController = (req, res) => {

    Recipe
    .findAll()
    .then(recipes => recipes.map(e => toResponseFormat(e.toJSON())))
    .then(recipes => {
        return res.status(success.ok).json({
            ok: true,
            recipes
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