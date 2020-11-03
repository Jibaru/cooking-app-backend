const { toResponseFormat } = require('../../utils/response_formatter');
const { success, clientError } = require('../../utils/http_status_codes');
const { IngredientCategory } = require('../../../models/index');

/// Create one IngredientCategory
const createController = (req, res) => {

    const { name, description } = req.body;

    IngredientCategory
    .create({
        name,
        description
    })
    .then(ingredientCategory => toResponseFormat(ingredientCategory.toJSON()))
    .then(ingredientCategory => {
        return res.status(success.created).json({
            ok: true,
            ingredientCategory
        });
    })
    .catch(error => {
        return res.status(clientError.badRequest).json({
            ok: false,
            error
        });
    });

};

module.exports = createController;