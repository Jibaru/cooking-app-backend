const { Equipment } = require('../../../models/index');
const _ = require('underscore');

// Get all Equipments
const getAllController = (req, res) => {

    Equipment
    .findAll()
    .then(equipments => equipments.map(e => _.omit(e.toJSON(), _.isNull)))
    .then(equipments => {
        return res.json({
            ok: true,
            equipments
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