const { toResponseFormat } = require('../../utils/response_formatter');
const { Equipment } = require('../../../models/index');

/// Create one Equipment
const createController = (req, res) => {

    const { imageId, name, description } = req.body;

    Equipment
    .create({
        imageId,
        name,
        description
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

module.exports = createController;