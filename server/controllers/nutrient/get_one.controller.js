const { toResponseFormat } = require('../../utils/response_formatter');
const { Nutrient, Ingredient } = require('../../../models/index');

/// Get one Nutrient by Id
const getOneController = (req, res) => {

    const id = req.params.id;

    Nutrient
    .findByPk(id, {
        include: [
            {
                model: Ingredient,
                as: 'ingredients',
                attributes: {
                    exclude: ['imageId']
                },
                through: {
                    as: 'amountOf',
                    attributes: ['units', 'value']
                },
            }
        ]
    })
    .then(nutrient => toResponseFormat(nutrient.toJSON()))
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