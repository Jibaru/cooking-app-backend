const { checkSchema  } = require('express-validator');
const { FileData } = require('../../models/index');
const { 
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
}

const getOneFileDataMiddleware = checkSchema({
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
});

const updateFileDataMiddleware = checkSchema({
    id: fileDataValidators.id,
    name: fileDataValidators.name(true),
    mimeType: fileDataValidators.mimeType(true)
});

module.exports = {
    getOneFileDataMiddleware,
    updateFileDataMiddleware
};