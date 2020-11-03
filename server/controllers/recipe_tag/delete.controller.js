const { toResponseFormat } = require('../../utils/response_formatter');
const { success, clientError } = require('../../utils/http_status_codes');
const { RecipeTag } = require('../../../models/index');

/// Delete one RecipeTag by Id
const deleteController = (req, res) => {

    const id = req.params.id;

    RecipeTag.findByPk(id)
    .then(recipeTag => {
        return recipeTag.destroy();
    })
    .then(recipeTag => toResponseFormat(recipeTag.toJSON()))
    .then(recipeTag => {
        return res.status(success.ok).json({
            ok: true,
            recipeTag
        });
    })
    .catch(error => {
        return res.status(clientError.badRequest).json({
            ok: false,
            error
        });
    });

};

module.exports = deleteController;