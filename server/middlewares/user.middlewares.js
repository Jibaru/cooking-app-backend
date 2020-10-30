const { checkSchema  } = require('express-validator');
const bcrypt = require('bcrypt');

const { 
    FileData,
    Role,
    User
} = require('../../models/index');
const validators = require('../validators/validators');

/*const { 
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
    firstName: optional => {
        return {
            in: ['body'],
            optional,
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
        }
    },
    lastName: optional => {
        return {
            in: ['body'],
            optional,
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
        }
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
        optional: true,
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
}*/

const signinUserMiddleware = checkSchema({
    profileImageId: {
        in: ['body'],
        optional: true,
        // Sanitizers
        trim: true,
        notEmpty: validators.notEmpty('profileImageId'),
        isInt: validators.isInt('profileImageId'),
        custom: validators.existResourceById('profileImageId', FileData),
        // Sanitizers
        toInt: true
    },
    roleId: {
        in: ['body'],
        optional: true,
        // Sanitizers
        trim: true,
        notEmpty: validators.notEmpty('roleId'),
        isInt: validators.isInt('roleId'),
        custom: validators.existResourceById('roleId', Role),
        // Sanitizers
        toInt: true
    },
    firstName: {
        in: ['body'],
        optional: false,
        exists: validators.exists('firstName'),
        // Sanitizers
        trim: true,
        notEmpty: validators.notEmpty('firstName'),
        isNumeric: validators.isNumericAndNotString('firstName'),
        isLength: validators.isMaxLength('firstName', 45),
    },
    lastName: {
        in: ['body'],
        optional: false,
        exists: validators.exists('lastName'),
        // Sanitizers
        trim: true,
        notEmpty: validators.notEmpty('lastName'),
        isNumeric: validators.isNumericAndNotString('lastName'),
        isLength: validators.isMaxLength('lastName', 45),
    },
    nickName: {
        in: ['body'],
        optional: false,
        exists: validators.exists('nickName'),
        // Sanitizers
        trim: true,
        notEmpty: validators.notEmpty('nickName'),
        isNumeric: validators.isNumericAndNotString('nickName'),
        isLength: validators.isMaxLength('nickName', 50),
        custom: validators.existResourceByField('nickName', User),
    },
    email: {
        in: ['body'],
        exists: validators.exists('email'),
        trim: true,
        isEmail: validators.isEmail('email'),
        notEmpty: validators.notEmpty('email'),
        isNumeric: validators.isNumericAndNotString('email'),
        isLength: validators.isMaxLength('email', 50),
        custom: validators.existResourceByField('email', User),
    },
    password: {
        in: ['body'],
        exists: validators.exists('password'),
        // Sanitizers
        trim: true,
        notEmpty: validators.notEmpty('password'),
        isNumeric: validators.isNumericAndNotString('password'),
        isLength: validators.isMaxLength('password', 20),
    }
});

const loginUserMiddleware = checkSchema({
    email: {
        in: ['body'],
        optional: false,
        exists: validators.exists('email'),
        trim: true,
        isEmail: validators.isEmail('email'),
        notEmpty: validators.notEmpty('email'),
        isNumeric: validators.isNumericAndNotString('email'),
        isLength: validators.isMaxLength('email', 50),
        custom: validators.existResourceByField('email', User),
    },
    password: {
        in: ['body'],
        exists: validators.exists('password'),
        // Sanitizers
        trim: true,
        notEmpty: validators.notEmpty('password'),
        isNumeric: validators.isNumericAndNotString('password'),
        isLength: validators.isMaxLength('password', 20),
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
    id: {
        in: ['params'],
        exists: validators.exists('id'),
        trim: true,
        notEmpty: validators.notEmpty('id'),
        isInt: validators.isInt('id'),
        custom: validators.existResourceById('id', User),
        // Sanitizers
        toInt: true
    },
});

const getOneUserMiddleware = checkSchema({
    id: {
        in: ['params'],
        exists: validators.exists('id'),
        trim: true,
        notEmpty: validators.notEmpty('id'),
        isInt: validators.isInt('id'),
        custom: validators.existResourceById('id', User),
        // Sanitizers
        toInt: true
    },
});

const updateUserMiddleware = checkSchema({
    profileImageId: {
        in: ['body'],
        optional: true,
        // Sanitizers
        trim: true,
        notEmpty: validators.notEmpty('profileImageId'),
        isInt: validators.isInt('profileImageId'),
        custom: validators.existResourceById('profileImageId', FileData),
        // Sanitizers
        toInt: true
    },
    roleId: {
        in: ['body'],
        optional: true,
        // Sanitizers
        trim: true,
        notEmpty: validators.notEmpty('roleId'),
        isInt: validators.isInt('roleId'),
        custom: validators.existResourceById('roleId', Role),
        // Sanitizers
        toInt: true
    },
    firstName: {
        in: ['body'],
        optional: true,
        exists: validators.exists('firstName'),
        // Sanitizers
        trim: true,
        notEmpty: validators.notEmpty('firstName'),
        isNumeric: validators.isNumericAndNotString('firstName'),
        isLength: validators.isMaxLength('firstName', 45),
    },
    lastName: {
        in: ['body'],
        optional: true,
        exists: validators.exists('lastName'),
        // Sanitizers
        trim: true,
        notEmpty: validators.notEmpty('lastName'),
        isNumeric: validators.isNumericAndNotString('lastName'),
        isLength: validators.isMaxLength('lastName', 45),
    },
    nickName: {
        in: ['body'],
        optional: true,
        exists: validators.exists('nickName'),
        // Sanitizers
        trim: true,
        notEmpty: validators.notEmpty('nickName'),
        isNumeric: validators.isNumericAndNotString('nickName'),
        isLength: validators.isMaxLength('nickName', 50),
        custom: validators.existResourceByField('nickName', User),
    },
    email: {
        in: ['body'],
        optional: true,
        exists: validators.exists('email'),
        trim: true,
        isEmail: validators.isEmail('email'),
        notEmpty: validators.notEmpty('email'),
        isNumeric: validators.isNumericAndNotString('email'),
        isLength: validators.isMaxLength('email', 50),
        custom: validators.existResourceByField('email', User),
    },
    password: {
        in: ['body'],
        optional: true,
        exists: validators.exists('password'),
        // Sanitizers
        trim: true,
        notEmpty: validators.notEmpty('password'),
        isNumeric: validators.isNumericAndNotString('password'),
        isLength: validators.isMaxLength('password', 20),
    },
    id: {
        in: ['params'],
        exists: validators.exists('id'),
        trim: true,
        notEmpty: validators.notEmpty('id'),
        isInt: validators.isInt('id'),
        custom: validators.existResourceById('id', User),
        // Sanitizers
        toInt: true
    },
});

module.exports = {
    signinUserMiddleware,
    loginUserMiddleware,
    deleteUserMiddleware,
    getOneUserMiddleware,
    updateUserMiddleware
};