const { toResponseFormat } = require('../../utils/response_formatter');
const { success, clientError } = require('../../utils/http_status_codes');
const { RecipeTag } = require('../../../models/index');

/// Get all RecipeTags
const getAllController = (req, res) => {

    RecipeTag
    .findAll()
    .then(recipeTags => recipeTags.map(e => toResponseFormat(e.toJSON())))
    .then(recipeTags => {
        return res.status(success.ok).json({
            ok: true,
            recipeTags
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