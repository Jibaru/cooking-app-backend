const { toResponseFormat } = require('../../utils/response_formatter');
const { Equipment } = require('../../../models/index');

// Get all Equipments
const getAllController = (req, res) => {

    Equipment
    .findAll()
    .then(equipments => equipments.map(e => toResponseFormat(e.toJSON())))
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