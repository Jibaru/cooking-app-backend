const { Equipment } = require('../../../models/index');
const _ = require('underscore');

/// Create one Equipment
const createController = (req, res) => {

    const { imageId, name, description } = req.body;

    Equipment
    .create({
        imageId,
        name,
        description
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

module.exports = createController;