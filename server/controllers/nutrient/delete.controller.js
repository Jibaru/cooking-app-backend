const { Nutrient } = require('../../../models/index');

/// Delete one Nutrient by Id
const deleteController = (req, res) => {

    const id = req.body.id;

    Nutrient
    .destroy({
        where: {
            id
        }
    })
    .then(nutrient => {
        return res.json({
            ok: true,
            nutrient
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