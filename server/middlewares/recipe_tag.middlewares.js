const { checkSchema  } = require('express-validator');
const { RecipeTag } = require('../../models/index');
const { 
    isNotTypeErrorMessage, 
    isEmptyErrorMessage, 
    isRequiredErrorMessage,
    maxLengthErrorMessage,
    notFoundErrorMessage,
    existsErrorMessage
} = require('../utils/error_templates');

const recipeTagValidators = {
    hash: {
        in: ['body'],
        trim: true,
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
        custom: {
            options: (value, {req, location, path}) => {
                return RecipeTag.findOne({
                    where: {
                        hash: req.body.hash
                    }
                })
                .then(model => {
                    if(!!model){
                        return Promise.reject(existsErrorMessage('hash', value));
                    }
                });
            }
        },
    },
    originalName: {
        in: ['body'],
        trim: true,
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
        custom: {
            options: (value, {req, location, path}) => {
                return RecipeTag.findOne({
                    where: {
                        originalName: req.body.originalName
                    }
                })
                .then(model => {
                    if(!!model){
                        return Promise.reject(existsErrorMessage('originalName', value));
                    }
                });
            }
        },
    },
    name: {
        in: ['body'],
        trim: true,
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
        custom: {
            options: (value, {req, location, path}) => {
                return RecipeTag.findOne({
                    where: {
                        name: req.body.name
                    }
                })
                .then(model => {
                    if(!!model){
                        return Promise.reject(existsErrorMessage('name', value));
                    }
                });
            }
        },
    },
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
                return RecipeTag.findByPk(value)
                    .then(recipeTag => {
                        if (recipeTag === null || recipeTag === undefined) {
                            return Promise.reject(notFoundErrorMessage('id', value));
                        }
                    });
            }
        },
        // Sanitizers
        toInt: true
    },
};

const createRecipeTagMiddleware = checkSchema({
    hash: recipeTagValidators.hash,
    originalName: recipeTagValidators.originalName,
    name: recipeTagValidators.name,
});

const deleteRecipeTagMiddleware = checkSchema({
    id: recipeTagValidators.id
});

const getOneRecipeTagMiddleware = checkSchema({
    id: recipeTagValidators.id
});

module.exports = {
    createRecipeTagMiddleware,
    deleteRecipeTagMiddleware,
    getOneRecipeTagMiddleware
};