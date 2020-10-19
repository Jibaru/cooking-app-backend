const { checkSchema  } = require('express-validator');

const { 
    FileData,
    Role,
    User
} = require('../../models/index');

const { 
    isEmptyErrorMessage,
    isNotTypeErrorMessage,
    notFoundErrorMessage,
    maxLengthErrorMessage,
    isRequiredErrorMessage,
    invalidFormatErrorMessage
} = require('../utils/error_templates');

const userValidators = {
    profileImageId: {
        in: ['body'],
        optional: true,
        isInt: {
            errorMessage: isNotTypeErrorMessage('profileImageId', 'integer')
        },
        notEmpty: {
            errorMessage: isEmptyErrorMessage('profileImageId')
        },
        custom: {
            options: (value, {req, location, path}) => { 
                return FileData.findByPk(value)
                    .then(fileData => {
                        if (fileData === null || fileData === undefined) {
                            return Promise.reject(notFoundErrorMessage('profileImageId', value));
                        }
                    });
            }
        },
        // Sanitizers
        toInt: true
    },
    roleId: {
        in: ['body'],
        optional: true,
        isInt: {
            errorMessage: isNotTypeErrorMessage('roleId', 'integer')
        },
        notEmpty: {
            errorMessage: isEmptyErrorMessage('roleId')
        },
        custom: {
            options: (value, {req, location, path}) => { 
                return Role.findByPk(value)
                    .then(role => {
                        if (role === null || role === undefined) {
                            return Promise.reject(notFoundErrorMessage('roleId', value));
                        }
                    });
            }
        },
        // Sanitizers
        toInt: true
    },
    firstName: {
        in: ['body'],
        exists: {
            errorMessage: isRequiredErrorMessage('firstName')
        },
        notEmpty: {
            errorMessage: isEmptyErrorMessage('firstName')
        },
        isNumeric: {
            negated: true,
            errorMessage: isNotTypeErrorMessage('firstName', 'string')
        },
        isLength: {
            errorMessage: maxLengthErrorMessage('firstName', 45),
            options: {
                max: 45
            }
        },
        // Sanitizers
        trim: true,
    },
    lastName: {
        in: ['body'],
        exists: {
            errorMessage: isRequiredErrorMessage('lastName')
        },
        notEmpty: {
            errorMessage: isEmptyErrorMessage('lastName')
        },
        isNumeric: {
            negated: true,
            errorMessage: isNotTypeErrorMessage('lastName', 'string')
        },
        isLength: {
            errorMessage: maxLengthErrorMessage('lastName', 45),
            options: {
                max: 45
            }
        },
        // Sanitizers
        trim: true,
    },
    nickName: {
        in: ['body'],
        optional: true,
        notEmpty: {
            errorMessage: isEmptyErrorMessage('nickName')
        },
        isNumeric: {
            negated: true,
            errorMessage: isNotTypeErrorMessage('nickName', 'string')
        },
        isLength: {
            errorMessage: maxLengthErrorMessage('nickName', 50),
            options: {
                max: 50
            }
        },
        // Sanitizers
        trim: true,
    },
    email: {
        in: ['body'],
        exists: {
            errorMessage: isRequiredErrorMessage('email')
        },
        isEmail: {
            errorMessage: invalidFormatErrorMessage('email'),
        },
        notEmpty: {
            errorMessage: isEmptyErrorMessage('email')
        },
        isNumeric: {
            negated: true,
            errorMessage: isNotTypeErrorMessage('email', 'string')
        },
        isLength: {
            errorMessage: maxLengthErrorMessage('email', 50),
            options: {
                max: 50
            }
        },
        // Sanitizers
        trim: true,
    },
    password: {
        in: ['body'],
        exists: {
            errorMessage: isRequiredErrorMessage('password')
        },
        notEmpty: {
            errorMessage: isEmptyErrorMessage('password')
        },
        isNumeric: {
            negated: true,
            errorMessage: isNotTypeErrorMessage('password', 'string')
        },
        isLength: {
            errorMessage: maxLengthErrorMessage('password', 20),
            options: {
                max: 20
            }
        },
        // Sanitizers
        trim: true,
    },
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
                return User.findByPk(value)
                    .then(user => {
                        if (user === null || user === undefined) {
                            return Promise.reject(notFoundErrorMessage('id', value));
                        }
                    });
            }
        },
        // Sanitizers
        toInt: true
    },
}

const signinUserMiddleware = checkSchema({
    profileImageId: userValidators.profileImageId,
    roleId: userValidators.roleId,
    firstName: userValidators.firstName,
    lastName: userValidators.lastName,
    nickName: userValidators.nickName,
    email: userValidators.email,
    password: userValidators.password
});

const loginUserMiddleware = checkSchema({
    email: userValidators.email,
    password: userValidators.password
});

const deleteUserMiddleware = checkSchema({
    id: userValidators.id
});

const getOneUserMiddleware = checkSchema({
    id: userValidators.id
});

const updateUserMiddleware = checkSchema({
    profileImageId: userValidators.profileImageId,
    roleId: userValidators.roleId,
    firstName: userValidators.firstName,
    lastName: userValidators.lastName,
    nickName: userValidators.nickName,
    email: userValidators.email,
    password: userValidators.password,
    id: userValidators.id
});

module.exports = {
    signinUserMiddleware,
    loginUserMiddleware,
    deleteUserMiddleware,
    getOneUserMiddleware,
    updateUserMiddleware
};