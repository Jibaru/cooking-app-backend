const { Equipment } = require('../../../models/index');

/// Delete one Equipment by Id
const deleteController = (req, res) => {

    const id = req.params.id;

    Equipment
    .destroy({
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

module.exports = deleteController;