const { toResponseFormat } = require('../../utils/response_formatter');
const { success, clientError } = require('../../utils/http_status_codes');
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
        return res.status(success.created).json({
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

module.exports = createController;