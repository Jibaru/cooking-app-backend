const { checkSchema  } = require('express-validator');
const { RecipeType } = require('../../models/index');
const { 
    isNotTypeErrorMessage, 
    isEmptyErrorMessage, 
    isRequiredErrorMessage,
    maxLengthErrorMessage,
    notFoundErrorMessage
} = require('../utils/error_templates');

const recipeTypeValidators = {
    hash: {
        in: ['body'],
        notEmpty: {
            errorMessage: isEmptyErrorMessage('hash')
        },
        isString: {
            errorMessage: isNotTypeErrorMessage('hash', 'string')
        },
        isLength: {
            errorMessage: maxLengthErrorMessage('hash', 10),
            options: {
                max: 10
            }
        },
        exists: {
            errorMessage: isRequiredErrorMessage('hash')
        },
        // Sanitizers
        trim: true,
    },
    originalName: {
        in: ['body'],
        notEmpty: {
            errorMessage: isEmptyErrorMessage('originalName')
        },
        isString: {
            errorMessage: isNotTypeErrorMessage('originalName', 'string')
        },
        isLength: {
            errorMessage: maxLengthErrorMessage('originalName', 45),
            options: {
                max: 45
            }
        },
        exists: {
            errorMessage: isRequiredErrorMessage('originalName')
        },
        // Sanitizers
        trim: true,
    },
    name: {
        in: ['body'],
        notEmpty: {
            errorMessage: isEmptyErrorMessage('name')
        },
        isString: {
            errorMessage: isNotTypeErrorMessage('name', 'string')
        },
        isLength: {
            errorMessage: maxLengthErrorMessage('name', 45),
            options: {
                max: 45
            }
        },
        exists: {
            errorMessage: isRequiredErrorMessage('name')
        },
        // Sanitizers
        trim: true,
    },
    description: {
        in: ['body'],
        optional: true,
        notEmpty: {
            errorMessage: isEmptyErrorMessage('description')
        },
        isString: {
            errorMessage: isNotTypeErrorMessage('description', 'string')
        },
        isLength: {
            errorMessage: maxLengthErrorMessage('description', 65535),
            options: {
                max: 65535
            }
        },
        // Sanitizers
        trim: true,
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
            errorMessage: isNotTypeErrorMessage('id', 'integer')
        },
        custom: {
            options: (value, {req, location, path}) => { 
                return RecipeType.findByPk(value)
                    .then(recipeType => {
                        if (recipeType === null || recipeType === undefined) {
                            return Promise.reject(notFoundErrorMessage('id', value));
                        }
                    });
            }
        },
        // Sanitizers
        toInt: true
    },
}

const createRecipeTypeMiddleware = checkSchema({
    hash: recipeTypeValidators.hash,
    originalName: recipeTypeValidators.originalName,
    name: recipeTypeValidators.name,
    description: recipeTypeValidators.description
});

const deleteRecipeTypeMiddleware = checkSchema({
    id: recipeTypeValidators.id
});

const getOneRecipeTypeMiddleware = checkSchema({
    id: recipeTypeValidators.id
});

module.exports = {
    createRecipeTypeMiddleware,
    deleteRecipeTypeMiddleware,
    getOneRecipeTypeMiddleware
};