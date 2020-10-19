const { checkSchema  } = require('express-validator');
const { Role } = require('../../models/index');
const { 
    isRequiredErrorMessage,
    isEmptyErrorMessage,
    isNotTypeErrorMessage,
    notFoundErrorMessage
} = require('../utils/error_templates');

const getOneRoleMiddleware = checkSchema({
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
                return Role.findByPk(value)
                    .then(role => {
                        if (role === null || role === undefined) {
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
    getOneRoleMiddleware
};