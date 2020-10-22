const { checkSchema  } = require('express-validator');
const bcrypt = require('bcrypt');

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
    invalidFormatErrorMessage,
    existsErrorMessage,
    invalidPassword,
} = require('../utils/error_templates');

const userValidators = {
    profileImageId: {
        in: ['body'],
        optional: true,
        // Sanitizers
        trim: true,
        notEmpty: {
            errorMessage: isEmptyErrorMessage('profileImageId')
        },
        isInt: {
            errorMessage: isNotTypeErrorMessage('profileImageId', 'integer')
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
        // Sanitizers
        trim: true,
        notEmpty: {
            errorMessage: isEmptyErrorMessage('roleId')
        },
        isInt: {
            errorMessage: isNotTypeErrorMessage('roleId', 'integer')
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
        // Sanitizers
        trim: true,
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
    },
    lastName: {
        in: ['body'],
        exists: {
            errorMessage: isRequiredErrorMessage('lastName')
        },
        // Sanitizers
        trim: true,
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
    },
    nickName: {
        in: ['body'],
        optional: true,
        // Sanitizers
        trim: true,
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
        custom: {
            options: (value, {req, location, path}) => {
                return User.findOne({
                    where: {
                        nickName: value
                    }
                })
                .then(user => {
                    if(!!user){
                        return Promise.reject(existsErrorMessage('nickName', value));
                    }
                });
            }
        },
    },
    email: {
        in: ['body'],
        exists: {
            errorMessage: isRequiredErrorMessage('email')
        },
        isEmail: {
            errorMessage: invalidFormatErrorMessage('email'),
        },
        // Sanitizers
        trim: true,
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
    },
    password: {
        in: ['body'],
        exists: {
            errorMessage: isRequiredErrorMessage('password')
        },
        // Sanitizers
        trim: true,
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
    },
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
    email: {
        in: userValidators.email.in,
        exists: userValidators.email.exists,
        trim: userValidators.email.trim,
        isEmail: userValidators.email.isEmail,
        notEmpty: userValidators.email.notEmpty,
        isNumeric: userValidators.email.isNumeric,
        isLength: userValidators.email.isLength,
        custom: {
            options: (value, {req, location, path}) => {
                return User.findOne({
                    where: {
                        email: req.body.email
                    }
                })
                .then(user => {
                    if(!!user){
                        return Promise.reject(existsErrorMessage('email', value));
                    }
                });
            }
        },
    },    
    password: userValidators.password
});

const loginUserMiddleware = checkSchema({
    email: {
        in: userValidators.email.in,
        exists: userValidators.email.exists,
        trim: userValidators.email.trim,
        isEmail: userValidators.email.isEmail,
        notEmpty: userValidators.email.notEmpty,
        isNumeric: userValidators.email.isNumeric,
        isLength: userValidators.email.isLength,
        custom: {
            options: (value, {req, location, path}) => {
                return User.findOne({
                    where: {
                        email: req.body.email
                    }
                })
                .then(user => {
                    if(user === null || user === undefined){
                        return Promise.reject(notFoundErrorMessage('email', value));
                    }
                });
            }
        },
    },
    password: {
        in: userValidators.password.in,
        exists: userValidators.password.exists,
        trim: userValidators.password.trim,
        notEmpty: userValidators.password.notEmpty,
        isNumeric: userValidators.password.isNumeric,
        isLength: userValidators.password.isLength,
        custom: {
            options: (value, {req, location, path}) => {
                return User.findOne({
                    where: {
                        email: req.body.email
                    }
                })
                .then(user => {
                    if (!!user) {
                        if(!bcrypt.compareSync(value, user.password)){
                            return Promise.reject(invalidPassword());
                        }
                    }
                });
            }
        },
    }
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