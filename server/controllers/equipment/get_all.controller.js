const { Equipment } = require('../../../models/index');

// Get all Equipments
const getAllController = (req, res) => {

    Equipment
    .findAll()
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