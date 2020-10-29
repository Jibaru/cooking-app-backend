const { toResponseFormat } = require('../../utils/response_formatter');
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
        return res.json({
            ok: true,
            nutrient
        });
    })
    .catch(error => {
        return res.status(500).json({
            ok: false,
            error
        });
    });

};

module.exports = createController;