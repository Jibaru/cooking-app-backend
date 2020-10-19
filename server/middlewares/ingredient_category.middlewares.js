const { checkSchema  } = require('express-validator');
const { IngredientCategory } = require('../../models/index');
const { 
    isRequiredErrorMessage,
    maxLengthErrorMessage,
    isNotTypeErrorMessage,
    isEmptyErrorMessage,
    notFoundErrorMessage
} = require('../utils/error_templates');

const ingredientCategoryValidators = {
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
        isNumeric: {
            negated: true,
            errorMessage: isNotTypeErrorMessage('name', 'string')
        },
        // Sanitizers
        trim: true
    },
    description: {
        optional: true,
        notEmpty: {
            errorMessage: isEmptyErrorMessage('description')
        },
        isLength: {
            errorMessage: maxLengthErrorMessage('description', 65535),
            options: {
                max: 65535
            }
        },
        // Sanitizers
        trim: true
    },
    id: {
        in: ['params'],
        exists: {
            errorMessage: isRequiredErrorMessage('id')
        },
        notEmpty: {
            errorMessage: isEmptyErrorMessage('id')
        },
        isInt: {
            errorMessage: isNotTypeErrorMessage('id', 'integer'),
        },
        custom: {
            options: (value, {req, location, path}) => {
                return IngredientCategory.findByPk(value)
                    .then(ingredientCategory => {
                        if (ingredientCategory === null || ingredientCategory === undefined) {
                            return Promise.reject(notFoundErrorMessage('id', value));
                        }
                    });
            }
        },
        // Sanitizers
        toInt: true
    },
};

const createIngredientCategoryMiddleware = checkSchema({
    name: ingredientCategoryValidators.name,
    description: ingredientCategoryValidators.description
});

const deleteIngredientCategoryMiddleware = checkSchema({
    id: ingredientCategoryValidators.id
});

const getOneIngredientCategoryMiddleware = checkSchema({
    id: ingredientCategoryValidators.id
});

module.exports = {
    createIngredientCategoryMiddleware,
    deleteIngredientCategoryMiddleware,
    getOneIngredientCategoryMiddleware,
};