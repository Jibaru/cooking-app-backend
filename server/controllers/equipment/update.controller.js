const { toResponseFormat } = require('../../utils/response_formatter');
const { success, clientError } = require('../../utils/http_status_codes');
const { Equipment } = require('../../../models/index');

/// Update one Equipment by Id
const updateController = (req, res) => {

    const id = req.params.id;
    const { imageId, name, description } = req.body;

    Equipment
    .update({
        imageId,
        name,
        description
    }, {
        where: {
            id
        }
    })
    .then((_) => Equipment.findByPk(id, {
        attributes: [
            ...((!!imageId) ? ['imageId']: []),
            ...((!!name) ? ['name']: []),
            ...((!!description) ? ['description'] : []),
        ]
    }))
    .then(equipment => toResponseFormat(equipment.toJSON()))
    .then(equipment => {
        return res.status(success.ok).json({
            ok: true,
            equipment
        });
    })
    .catch(error => {
        return res.status(clientError.badRequest).json({
            ok: false,
            error
        });
    });

};

module.exports = updateController;