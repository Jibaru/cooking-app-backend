const { Nutrient } = require('../../../models/index');
const _ = require('underscore');

/// Get one Nutrient by Id
const getOneController = (req, res) => {

    const id = req.params.id;

    Nutrient
    .findByPk(id)
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

module.exports = getOneController;