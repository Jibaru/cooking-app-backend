const { toResponseFormat } = require('../../utils/response_formatter');
const { success, clientError } = require('../../utils/http_status_codes');
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
        return res.status(success.ok).json({
            ok: true,
            nutrient
        });
    })
    .catch(error => {
        return res.status(clientError.badRequest).json({
            ok: false,
            error
        });
    });

};

module.exports = getOneController;