const { checkSchema  } = require('express-validator');
const { 
    Ingredient,
    FileData
} = require('../../models/index');

const { 
    isNotTypeErrorMessage, 
    isEmptyErrorMessage, 
    isRequiredErrorMessage,
    maxLengthErrorMessage,
    notFoundErrorMessage,
    existsErrorMessage
} = require('../utils/error_templates');

const ingredientValidators = {
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
                return Ingredient.findByPk(value)
                    .then(ingredient => {
                        if (ingredient === null || ingredient === undefined) {
                            return Promise.reject(notFoundErrorMessage('id', value));
                        }
                    });
            }
        },
        // Sanitizers
        toInt: true
    },
    imageId: {
        in: ['body'],
        optional: true,
        notEmpty: {
            errorMessage: isEmptyErrorMessage('imageId')
        },
        isInt: {
            errorMessage: isNotTypeErrorMessage('imageId', 'integer')
        },
        custom: {
            options: (value, {req, location, path}) => { 
                return FileData.findByPk(value)
                    .then(fileData => {
                        if (fileData === null || fileData === undefined) {
                            return Promise.reject(notFoundErrorMessage('imageId', value));
                        }
                    });
            }
        },
        // Sanitizers
        toInt: true
    },
    name: {
        in: ['body'],
        notEmpty: {
            errorMessage: isEmptyErrorMessage('name')
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
        custom: {
            options: (value, {req, location, path}) => {
                return Ingredient.findOne({
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
        trim: true
    }
}

const createIngredientMiddleware = checkSchema({
    imageId: ingredientValidators.imageId,
    name: ingredientValidators.name,
    description: ingredientValidators.description
});

const getOneIngredientMiddleware = checkSchema({
    id: ingredientValidators.id
});

const updateIngredientMiddleware = checkSchema({
    id: ingredientValidators.id,
    imageId: ingredientValidators.imageId,
    name: ingredientValidators.name,
    description: ingredientValidators.description
});


module.exports = {
    createIngredientMiddleware,
    getOneIngredientMiddleware,
    updateIngredientMiddleware
};