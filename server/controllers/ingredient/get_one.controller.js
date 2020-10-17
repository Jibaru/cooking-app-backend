const { Ingredient } = require('../../../models/index');

/// Get one Ingredient by Id
const getOneController = (req, res) => {

    const id = req.params.id;

    Ingredient
    .findByPk(id)
    .then(ingredient => {
        return res.json({
            ok: true,
            ingredient
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