const { checkSchema  } = require('express-validator');
const { UserNotification } = require('../../models/index');
const {  
    isEmptyErrorMessage,
    isNotTypeErrorMessage,
    maxLengthErrorMessage,
    isRequiredErrorMessage,
    notFoundErrorMessage
} = require('../utils/error_templates');

const createUserNotificationMiddleware = checkSchema({
    subject: {
        in: ['body'],
        exists: {
            errorMessage: isRequiredErrorMessage('subject')
        },
        trim: true,
        notEmpty: {
            errorMessage: isEmptyErrorMessage('subject')
        },
        isNumeric: {
            negated: true,
            errorMessage: isNotTypeErrorMessage('subject', 'string')
        },
        isLength: {
            errorMessage: maxLengthErrorMessage('subject', 45),
            options: {
                max: 45
            }
        },
        // Sanitizers
        trim: true,
    },
    dateTimeSended: {
        in: ['body'],
        optional: true,
        isDate: {
            errorMessage: isNotTypeErrorMessage('dateTimeSended', 'date'),
        },
        // Sanitizers
        toDate: true
    },
    dateTimeViewed: {
        in: ['body'],
        optional: true,
        isDate: {
            errorMessage: isNotTypeErrorMessage('dateTimeViewed', 'date'),
        },
        // Sanitizers
        toDate: true
    }, 
    content: {
        in: ['body'],
        exists: {
            errorMessage: isRequiredErrorMessage('content')
        },
        trim: true,
        notEmpty: {
            errorMessage: isEmptyErrorMessage('content')
        },
        isNumeric: {
            negated: true,
            errorMessage: isNotTypeErrorMessage('content', 'string')
        },
        isLength: {
            errorMessage: maxLengthErrorMessage('content', 65535),
            options: {
                max: 65535
            }
        },
        // Sanitizers
        trim: true,
    },
});

const deleteUserNotificationMiddleware = checkSchema({
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
                return UserNotification.findByPk(value)
                    .then(userNotification => {
                        if (userNotification === null || userNotification === undefined) {
                            return Promise.reject(notFoundErrorMessage('id', value));
                        }
                    });
            }
        },
        // Sanitizers
        toInt: true
    },
})

module.exports = {
    createUserNotificationMiddleware,
    deleteUserNotificationMiddleware
};