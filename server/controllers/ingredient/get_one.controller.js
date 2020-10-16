const { Ingredient } = require('../../../models/index');

/// Get one Ingredient by Id
const getOneController = (req, res) => {

    Ingredient
    .findAll()
    .then(ingredients => {
        return res.json({
            ok: true,
            ingredients
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