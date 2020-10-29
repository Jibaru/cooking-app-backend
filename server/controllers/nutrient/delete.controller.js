const { toResponseFormat } = require('../../utils/response_formatter');
const { Nutrient } = require('../../../models/index');

/// Delete one Nutrient by Id
const deleteController = (req, res) => {

    const id = req.params.id;

    Nutrient.findByPk(id)
    .then(nutrient => {
        return nutrient.destroy();
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

module.exports = deleteController;