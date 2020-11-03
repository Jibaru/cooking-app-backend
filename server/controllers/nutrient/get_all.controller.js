const { toResponseFormat } = require('../../utils/response_formatter');
const { success, clientError } = require('../../utils/http_status_codes');
const { Nutrient } = require('../../../models/index');

/// Get all Nutrients
const getAllController = (req, res) => {

    Nutrient
    .findAll()
    .then(nutrients => nutrients.map(e => toResponseFormat(e.toJSON())))
    .then(nutrients => {
        return res.status(success.ok).json({
            ok: true,
            nutrients
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