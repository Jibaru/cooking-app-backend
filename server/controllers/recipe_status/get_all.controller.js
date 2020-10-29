const { toResponseFormat } = require('../../utils/response_formatter');
const { RecipeStatus } = require('../../../models/index');

/// Get all RecipeStatuses
const getAllController = (req, res) => {

    RecipeStatus
    .findAll()
    .then(recipeStatuses => recipeStatuses.map(e => toResponseFormat(e.toJSON())))
    .then(recipeStatuses => {
        return res.json({
            ok: true,
            recipeStatuses
        });
    })
    .catch(error => {
        return res.status(500).json({
            ok: false,
            error
        });
    });

};

module.exports = getAllController;