const { Equipment } = require('../../../models/index');

/// Create one Equipment
const createController = (req, res) => {

    const { imageId, name, description } = req.body;
    return res.json({body: req.body});
    Equipment
    .create({
        imageId,
        name,
        description
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

module.exports = createController;