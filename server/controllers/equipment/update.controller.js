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

module.exports = updateController;