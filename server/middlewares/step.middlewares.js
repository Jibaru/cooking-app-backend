const { checkSchema  } = require('express-validator');
const { Step } = require('../../models/index');
const { 
    isRequiredErrorMessage,
    isEmptyErrorMessage,
    isNotTypeErrorMessage,
    notFoundErrorMessage
} = require('../utils/error_templates');

const getOneStepMiddleware = checkSchema({
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
                return Step.findByPk(value)
                    .then(step => {
                        if (step === null || step === undefined) {
                            return Promise.reject(notFoundErrorMessage('id', value));
                        }
                    });
            }
        },
        // Sanitizers
        toInt: true
    },
});

module.exports = {
    getOneStepMiddleware
};