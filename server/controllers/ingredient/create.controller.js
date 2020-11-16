const { toResponseFormat } = require('../../utils/response_formatter');
const { success, clientError } = require('../../utils/http_status_codes');
const { Ingredient } = require('../../../models/index');

const StatusPending = 2;

/// Create one Ingredient
const createController = (req, res) => {

    const { name, description, imageId } = req.body;

    Ingredient
    .create({
        name,
        description,
        imageId,
        statusId: StatusPending
    })
    .then(ingredient => toResponseFormat(ingredient.toJSON()))
    .then(ingredient => {
        return res.status(success.created).json({
            ok: true,
            ingredient
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