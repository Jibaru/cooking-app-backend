const { toResponseFormat } = require('../../utils/response_formatter');
const { RecipeType } = require('../../../models/index');

/// Get all RecipeTypes
const getAllController = (req, res) => {

    RecipeType
    .findAll()
    .then(recipeTypes => recipeTypes.map(e => toResponseFormat(e.toJSON())))
    .then(recipeTypes => {
        return res.json({
            ok: true,
            recipeTypes
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