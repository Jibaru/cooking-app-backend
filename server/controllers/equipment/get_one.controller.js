const { Equipment } = require('../../../models/index');

/// Get one Equipment by Id
const getOneController = (req, res) => {

    const id = req.params.id;

    Equipment
    .findByPk(id)
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

module.exports = getOneController;