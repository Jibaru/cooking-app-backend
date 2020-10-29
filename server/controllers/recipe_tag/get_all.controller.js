const { toResponseFormat } = require('../../utils/response_formatter');
const { RecipeTag } = require('../../../models/index');

/// Get all RecipeTags
const getAllController = (req, res) => {

    RecipeTag
    .findAll()
    .then(recipeTags => recipeTags.map(e => toResponseFormat(e.toJSON())))
    .then(recipeTags => {
        return res.json({
            ok: true,
            recipeTags
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