const { Equipment } = require('../../../models/index');
const _ = require('underscore');

/// Delete one Equipment by Id
const deleteController = (req, res) => {

    const id = req.params.id;

    Equipment.findByPk(id)
    .then(equipment => {
        return equipment.destroy();
    })
    .then(equipment => _.omit(equipment.toJSON(), _.isNull))
    .then(equipment => {
        return res.json({
            ok: true,
            equipment
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