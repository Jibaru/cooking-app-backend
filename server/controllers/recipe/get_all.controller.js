const { toResponseFormat } = require('../../utils/response_formatter');
const { Recipe } = require('../../../models/index');

/// Get all Recipes
const getAllController = (req, res) => {

    Recipe
    .findAll()
    .then(recipes => recipes.map(e => toResponseFormat(e.toJSON())))
    .then(recipes => {
        return res.json({
            ok: true,
            recipes
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