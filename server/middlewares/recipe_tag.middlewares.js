const { checkSchema  } = require('express-validator');
const { RecipeTag } = require('../../models/index');
const validators = require('../validators/validators');
/*const { 
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
};*/

const createRecipeTagMiddleware = checkSchema({
    hash: {
        in: ['body'],
        trim: true,
        notEmpty: validators.notEmpty('hash'),
        isString: validators.isNumericAndNotString('hash'),
        isLength: validators.isMaxLength('hash', 10),
        exists: validators.exists('hash'),
        custom: validators.existResourceByField('hash', RecipeTag),
    },
    originalName: {
        in: ['body'],
        trim: true,
        notEmpty: validators.notEmpty('originalName'),
        isString: validators.isNumericAndNotString('originalName'),
        isLength: validators.isMaxLength('originalName', 45),
        exists: validators.exists('originalName'),
        custom: validators.existResourceByField('originalName', RecipeTag),
    },
    name: {
        in: ['body'],
        trim: true,
        notEmpty: validators.notEmpty('name'),
        isString: validators.isNumericAndNotString('name'),
        isLength: validators.isMaxLength('name', 45),
        exists: validators.exists('name'),
        custom: validators.existResourceByField('name', RecipeTag),
    },
});

const deleteRecipeTagMiddleware = checkSchema({
    id: {
        in: ['params'],
        exists: validators.exists('id'),
        trim: true,
        notEmpty: validators.notEmpty('id'),
        isInt: validators.isInt('id'),
        custom: validators.existResourceById('id', RecipeTag),
        // Sanitizers
        toInt: true
    },
});

const getOneRecipeTagMiddleware = checkSchema({
    id: {
        in: ['params'],
        exists: validators.exists('id'),
        trim: true,
        notEmpty: validators.notEmpty('id'),
        isInt: validators.isInt('id'),
        custom: validators.existResourceById('id', RecipeTag),
        // Sanitizers
        toInt: true
    },
});

module.exports = {
    createRecipeTagMiddleware,
    deleteRecipeTagMiddleware,
    getOneRecipeTagMiddleware
};