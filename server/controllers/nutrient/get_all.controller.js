const { toResponseFormat } = require('../../utils/response_formatter');
const { Nutrient } = require('../../../models/index');

/// Get all Nutrients
const getAllController = (req, res) => {

    Nutrient
    .findAll()
    .then(nutrients => nutrients.map(e => toResponseFormat(e.toJSON())))
    .then(nutrients => {
        return res.json({
            ok: true,
            nutrients
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