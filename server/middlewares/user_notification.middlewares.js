const { checkSchema  } = require('express-validator');
const { UserNotification, User } = require('../../models/index');
const validators = require('../validators/validators');

const createUserNotificationMiddleware = checkSchema({
    subject: {
        in: ['body'],
        exists: validators.exists('subject'),
        trim: true,
        notEmpty: validators.notEmpty('subject'),
        isNumeric: validators.isNumericAndNotString('subject'),
        isLength: validators.isMaxLength('subject', 45),
        // Sanitizers
        trim: true,
    },
    dateTimeSended: {
        in: ['body'],
        optional: true,
        isDate: validators.isDate('dateTimeSended'),
        // Sanitizers
        toDate: true
    },
    content: {
        in: ['body'],
        exists: validators.exists('content'),
        trim: true,
        notEmpty: validators.notEmpty('content'),
        isNumeric: validators.isNumericAndNotString('content'),
        isLength: validators.isMaxLength('content', 65535),
        // Sanitizers
        trim: true,
    },
    userId: {
        in: ['body'],
        optional: true,
        trim: true,
        notEmpty: validators.notEmpty('userId'),
        isInt: validators.isInt('userId'),
        custom: validators.existResourceById('userId', User),
        // Sanitizers
        toInt: true
    }
});

const deleteUserNotificationMiddleware = checkSchema({
    id: {
        in: ['params'],
        exists: validators.exists('id'),
        trim: true,
        notEmpty: validators.notEmpty('id'),
        isInt: validators.isInt('id'),
        custom: validators.existResourceById('id', UserNotification),
        // Sanitizers
        toInt: true
    },
})

module.exports = {
    createUserNotificationMiddleware,
    deleteUserNotificationMiddleware
};