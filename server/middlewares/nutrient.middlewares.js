const { checkSchema  } = require('express-validator');
const { Nutrient } = require('../../models/index');
const validators = require('../validators/validators');
/*const { 
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
};*/

const createNutrientMiddleware = checkSchema({
    name: {
        in: ['body'],
        exists: validators.exists('name'),
        trim: true,
        notEmpty: validators.notEmpty('name'),
        isLength: validators.isMaxLength('name', 45),
        custom: validators.existResourceByField('name', Nutrient),
    }
});

const deleteNutrientMiddleware = checkSchema({
    id: {
        in: ['params'],
        exists: validators.exists('id'),
        trim: true,
        notEmpty: validators.notEmpty('id'),
        isInt: validators.isInt('id'),
        custom: validators.existResourceById('id', Nutrient),
        // Sanitizers
        toInt: true
    },
});

const getOneNutrientMiddleware = checkSchema({
    id: {
        in: ['params'],
        exists: validators.exists('id'),
        trim: true,
        notEmpty: validators.notEmpty('id'),
        isInt: validators.isInt('id'),
        custom: validators.existResourceById('id', Nutrient),
        // Sanitizers
        toInt: true
    },
});

module.exports = {
    createNutrientMiddleware,
    deleteNutrientMiddleware,
    getOneNutrientMiddleware
};