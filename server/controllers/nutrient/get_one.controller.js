const { Nutrient } = require('../../../models/index');

/// Get one Nutrient by Id
const getOneController = (req, res) => {

    const id = req.body.id;

    Nutrient
    .findByPk(id)
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

module.exports = getOneController;