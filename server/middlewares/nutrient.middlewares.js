const { checkSchema  } = require('express-validator');
const { Nutrient } = require('../../models/index');
const { 
    isRequiredErrorMessage,
    isEmptyErrorMessage,
    maxLengthErrorMessage,
    isNotTypeErrorMessage,
    notFoundErrorMessage
} = require('../utils/error_templates');

const nutrientValidators = {
    id: {
        in: ['params'],
        exists: {
            errorMessage: isRequiredErrorMessage('id')
        },
        notEmpty: {
            errorMessage: isEmptyErrorMessage('id')
        },
        isInt: {
            errorMessage: isNotTypeErrorMessage('id', 'integer')
        },
        custom: {
            options: (value, {req, location, path}) => { 
                return Nutrient.findByPk(value)
                    .then(nutrient => {
                        if (nutrient === null || nutrient === undefined) {
                            return Promise.reject(notFoundErrorMessage('id', value));
                        }
                    });
            }
        },
        // Sanitizers
        toInt: true
    },
    name: {
        in: ['body'],
        exists: {
            errorMessage: isRequiredErrorMessage('name')
        },
        notEmpty: {
            errorMessage: isEmptyErrorMessage('name')
        },
        isLength: {
            errorMessage: maxLengthErrorMessage('name', 45),
            options: {
                max: 45
            }
        },
    }
};

const createNutrientMiddleware = checkSchema({
    name: nutrientValidators.name
});

const deleteNutrientMiddleware = checkSchema({
    id: nutrientValidators.id
});

const getOneNutrientMiddleware = checkSchema({
    id: nutrientValidators.id
});

module.exports = {
    createNutrientMiddleware,
    deleteNutrientMiddleware,
    getOneNutrientMiddleware
};