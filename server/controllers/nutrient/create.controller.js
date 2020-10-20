const { Nutrient } = require('../../../models/index');
const _ = require('underscore');

/// Create one Nutrient
const createController = (req, res) => {

    const name = req.body.name;

    Nutrient
    .create({
        name
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

module.exports = createController;