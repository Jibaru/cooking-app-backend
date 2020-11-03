const { toResponseFormat } = require('../../utils/response_formatter');
const { success, clientError } = require('../../utils/http_status_codes');
const { RecipeCuisine } = require('../../../models/index');

/// Delete one RecipeCuisine by Id
const deleteController = (req, res) => {

    const id = req.params.id;

    RecipeCuisine.findByPk(id)
    .then(recipeCuisine => {
        return recipeCuisine.destroy();
    })
    .then(recipeCuisine => toResponseFormat(recipeCuisine.toJSON()))
    .then(recipeCuisine => {
        return res.status(success.ok).json({
            ok: true,
            recipeCuisine
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