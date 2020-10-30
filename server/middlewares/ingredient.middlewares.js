const { checkSchema  } = require('express-validator');
const { 
    Ingredient,
    FileData
} = require('../../models/index');
const validators = require('../validators/validators');
/*const { 
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
        trim: true,
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
        trim: true,
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
    name: optional => {
        return {
            in: ['body'],
            optional,
            // Sanitizers
            trim: true,
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
        }
    },
    description: {
        in: ['body'],
        optional: true,
        // Sanitizers
        trim: true,
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
    }
}*/

const createIngredientMiddleware = checkSchema({
    imageId: {
        in: ['body'],
        optional: true,
        trim: true,
        notEmpty: validators.notEmpty('imageId'),
        isInt: validators.isInt('imageId'),
        custom: validators.existResourceById('imageId', FileData),
        // Sanitizers
        toInt: true
    },
    name: {
        in: ['body'],
        optional: false,
        // Sanitizers
        trim: true,
        exists: validators.exists('name'),
        notEmpty: validators.notEmpty('name'),
        isLength: validators.isMaxLength('name', 45),
        custom: validators.existResourceByField('name', Ingredient),
    },
    description: {
        in: ['body'],
        optional: true,
        // Sanitizers
        trim: true,
        notEmpty: validators.notEmpty('description'),
        isLength: validators.isMaxLength('description', 65535),
    }
});

const getOneIngredientMiddleware = checkSchema({
    id: {
        in: ['params'],
        exists: validators.exists('id'),
        trim: true,
        notEmpty: validators.notEmpty('id'),
        isInt: validators.isInt('id'),
        custom: validators.existResourceById('id', Ingredient),
        // Sanitizers
        toInt: true
    },
});

const updateIngredientMiddleware = checkSchema({
    id: {
        in: ['params'],
        exists: validators.exists('id'),
        trim: true,
        notEmpty: validators.notEmpty('id'),
        isInt: validators.isInt('id'),
        custom: validators.existResourceById('id', Ingredient),
        // Sanitizers
        toInt: true
    },
    imageId: {
        in: ['body'],
        optional: true,
        trim: true,
        notEmpty: validators.notEmpty('imageId'),
        isInt: validators.isInt('imageId'),
        custom: validators.existResourceById('imageId', FileData),
        // Sanitizers
        toInt: true
    },
    name: {
        in: ['body'],
        optional: true,
        // Sanitizers
        trim: true,
        exists: validators.exists('name'),
        notEmpty: validators.notEmpty('name'),
        isLength: validators.isMaxLength('name', 45),
        custom: validators.existResourceByField('name', Ingredient),
    },
    description: {
        in: ['body'],
        optional: true,
        // Sanitizers
        trim: true,
        notEmpty: validators.notEmpty('description'),
        isLength: validators.isMaxLength('description', 65535),
    }
});


module.exports = {
    createIngredientMiddleware,
    getOneIngredientMiddleware,
    updateIngredientMiddleware
};