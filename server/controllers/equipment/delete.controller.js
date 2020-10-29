const { toResponseFormat } = require('../../utils/response_formatter');
const { Equipment } = require('../../../models/index');

/// Delete one Equipment by Id
const deleteController = (req, res) => {

    const id = req.params.id;

    Equipment.findByPk(id)
    .then(equipment => {
        return equipment.destroy();
    })
    .then(equipment => toResponseFormat(equipment.toJSON()))
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