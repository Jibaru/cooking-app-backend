const { Nutrient } = require('../../../models/index');
const _ = require('underscore');

/// Get all Nutrients
const getAllController = (req, res) => {

    Nutrient
    .findAll()
    .then(nutrients => nutrients.map(e => _.omit(e.toJSON(), _.isNull)))
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