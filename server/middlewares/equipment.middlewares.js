const { checkSchema  } = require('express-validator');
const { 
    isNotTypeErrorMessage, 
    isEmptyErrorMessage, 
    isRequiredErrorMessage,
    maxLengthErrorMessage 
} = require('../utils/error_templates');

const createEquipmentMiddleware = checkSchema({
    imageId: {
        in: ['body'],
        optional: true,
        isInt: {
            errorMessage: isNotTypeErrorMessage('imageId', 'integer')
        },
        notEmpty: {
            errorMessage: isEmptyErrorMessage('imageId')
        },
        // Sanitizers
        toInt: true
    },
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
    }    
});

module.exports = {
    createEquipmentMiddleware
}