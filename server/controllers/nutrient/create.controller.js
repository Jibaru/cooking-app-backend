const { toResponseFormat } = require('../../utils/response_formatter');
const { success, clientError } = require('../../utils/http_status_codes');
const { Nutrient } = require('../../../models/index');

/// Create one Nutrient
const createController = (req, res) => {

    const name = req.body.name;

    Nutrient
    .create({
        name
    })
    .then(nutrient => toResponseFormat(nutrient.toJSON()))
    .then(nutrient => {
        return res.status(success.created).json({
            ok: true,
            nutrient
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