const { checkSchema  } = require('express-validator');
const { FileData } = require('../../models/index');
const validators = require('../validators/validators');
/*const { 
    isRequiredErrorMessage,
    isEmptyErrorMessage,
    isNotTypeErrorMessage,
    isNotFormatErrorMessage,
    maxLengthErrorMessage,
    notFoundErrorMessage
} = require('../utils/error_templates');

const { mimeTypeRegex } = require('../utils/common_regex');

const fileDataValidators = {
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
                return FileData.findByPk(value)
                    .then(fileData => {
                        if (fileData === null || fileData === undefined) {
                            return Promise.reject(notFoundErrorMessage('id', value));
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
                errorMessage: maxLengthErrorMessage('name', 80),
                options: {
                    max: 80
                }
            },
        }
    },
    mimeType: optional => {
        return {
            in: ['body'],
            optional,
            // Sanitizers
            trim: true,
            exists: {
                errorMessage: isRequiredErrorMessage('name')
            },
            notEmpty: {
                errorMessage: isEmptyErrorMessage('mimeType')
            },
            isLength: {
                errorMessage: maxLengthErrorMessage('mimeType', 30),
                options: {
                    max: 30
                }
            },
            custom: {
                errorMessage: isNotFormatErrorMessage('mimeType', 'type "/" [tree "."] subtype ["+" suffix] *[";" parameter]'),
                options: (value, {req, location, path}) => {
                    return mimeTypeRegex.test(value);
                }
            },
        }
    }
}*/

const getOneFileDataMiddleware = checkSchema({
    id: {
        in: ['params'],
        exists: validators.exists('id'),
        trim: true,
        notEmpty: validators.notEmpty('id'),
        isInt: validators.isInt('id'),
        custom: validators.existResourceById('id', FileData),
        // Sanitizers
        toInt: true
    },
});

const updateFileDataMiddleware = checkSchema({
    id: {
        in: ['params'],
        exists: validators.exists('id'),
        trim: true,
        notEmpty: validators.notEmpty('id'),
        isInt: validators.isInt('id'),
        custom: validators.existResourceById('id', FileData),
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
        isLength: validators.isMaxLength('name', 80),
    },
    mimeType: {
        in: ['body'],
        optional: true,
        // Sanitizers
        trim: true,
        exists: validators.exists('mimeType'),
        notEmpty: validators.notEmpty('mimeType'),
        isLength: validators.isMaxLength('mimeType', 30),
        custom: validators.isNotFormat('mimeType', 'tipo/subtipo'),
    }
});

module.exports = {
    getOneFileDataMiddleware,
    updateFileDataMiddleware
};