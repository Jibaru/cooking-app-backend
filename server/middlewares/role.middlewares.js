const { checkSchema  } = require('express-validator');
const { Role } = require('../../models/index');
const validators = require('../validators/validators');

const getOneRoleMiddleware = checkSchema({
    id: {
        in: ['params'],
        exists: validators.exists('id'),
        trim: true,
        notEmpty: validators.notEmpty('id'),
        isInt: validators.isInt('id'),
        custom: validators.existResourceById('id', Role),
        // Sanitizers
        toInt: true
    },
});

module.exports = {
    getOneRoleMiddleware
};