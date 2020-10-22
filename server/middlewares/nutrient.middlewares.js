const { checkSchema  } = require('express-validator');
const { Nutrient } = require('../../models/index');
const { 
    isRequiredErrorMessage,
    isEmptyErrorMessage,
    maxLengthErrorMessage,
    isNotTypeErrorMessage,
    notFoundErrorMessage,
    existsErrorMessage
} = require('../utils/error_templates');

const nutrientValidators = {
    id: {
        in: ['params'],
        exists: {
            errorMessage: isRequiredErrorMessage('id')
        },
        trim: true,
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
        trim: true,
        notEmpty: {
            errorMessage: isEmptyErrorMessage('name')
        },
        isLength: {
            errorMessage: maxLengthErrorMessage('name', 45),
            options: {
                max: 45
            }
        },
        custom: {
            options: (value, {req, location, path}) => {
                return Nutrient.findOne({
                    where: {
                        name: value
                    }
                })
                .then(model => {
                    if(!!model){
                        return Promise.reject(existsErrorMessage('name', value));
                    }
                });
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