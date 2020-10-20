const { Nutrient } = require('../../../models/index');
const _ = require('underscore');

/// Delete one Nutrient by Id
const deleteController = (req, res) => {

    const id = req.params.id;

    Nutrient.findByPk(id)
    .then(nutrient => {
        return nutrient.destroy();
    })
    .then(nutrient => _.omit(nutrient.toJSON(), _.isNull))
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