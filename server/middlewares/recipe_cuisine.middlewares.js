const { checkSchema  } = require('express-validator');
const { RecipeCuisine } = require('../../models/index');
const { 
    isNotTypeErrorMessage, 
    isEmptyErrorMessage, 
    isRequiredErrorMessage,
    maxLengthErrorMessage,
    notFoundErrorMessage,
    existsErrorMessage,
} = require('../utils/error_templates');

const recipeCuisineValidators = {
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
                return RecipeCuisine.findByPk(value)
                    .then(recipeCuisine => {
                        if (recipeCuisine === null || recipeCuisine === undefined) {
                            return Promise.reject(notFoundErrorMessage('id', value));
                        }
                    });
            }
        },
        // Sanitizers
        toInt: true
    },
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
        custom: {
            options: (value, {req, location, path}) => {
                return RecipeCuisine.findOne({
                    where: {
                        hash: value
                    }
                })
                .then(model => {
                    if(!!model){
                        return Promise.reject(existsErrorMessage('hash', value));
                    }
                });
            }
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
        custom: {
            options: (value, {req, location, path}) => {
                return RecipeCuisine.findOne({
                    where: {
                        originalName: value
                    }
                })
                .then(model => {
                    if(!!model){
                        return Promise.reject(existsErrorMessage('originalName', value));
                    }
                });
            }
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
        custom: {
            options: (value, {req, location, path}) => {
                return RecipeCuisine.findOne({
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
    region: {
        in: ['body'],
        optional: true,
        notEmpty: {
            errorMessage: isEmptyErrorMessage('region')
        },
        isString: {
            errorMessage: isNotTypeErrorMessage('region', 'string')
        },
        isLength: {
            errorMessage: maxLengthErrorMessage('region', 45),
            options: {
                max: 45
            }
        },
        // Sanitizers
        trim: true,
    }
};

const createRecipeCuisineMiddleware = checkSchema({
    hash: recipeCuisineValidators.hash,
    originalName: recipeCuisineValidators.originalName,
    name: recipeCuisineValidators.name,
    region: recipeCuisineValidators.region
});

const deleteRecipeCuisineMiddleware = checkSchema({
    id: recipeCuisineValidators.id
});

const getOneRecipeCuisineMiddleware = checkSchema({
    id: recipeCuisineValidators.id
});

module.exports = {
    createRecipeCuisineMiddleware,
    deleteRecipeCuisineMiddleware,
    getOneRecipeCuisineMiddleware
};