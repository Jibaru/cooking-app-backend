const { toResponseFormat } = require('../../utils/response_formatter');
const { Ingredient } = require('../../../models/index');

/// Update one Ingredient by Id
const updateController = (req, res) => {

    const id = req.params.id;
    const { imageId, name, description } = req.body;

    Ingredient
    .update({
        imageId,
        name,
        description
    }, {
        where: {
            id
        }
    })
    .then((_) => Ingredient.findByPk(id, {
        attributes: [
            ...((!!imageId) ? ['imageId']: []),
            ...((!!name) ? ['name']: []),
            ...((!!description) ? ['description'] : []),
        ]
    }))
    .then(ingredient => toResponseFormat(ingredient.toJSON()))
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

module.exports = updateController;