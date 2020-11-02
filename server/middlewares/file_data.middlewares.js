const { checkSchema  } = require('express-validator');
const { FileData } = require('../../models/index');
const validators = require('../validators/validators');

const getOneFileDataMiddleware = checkSchema({
    id: {
        in: ['params'],
        exists: validators.exists('id'),
        trim: true,
        notEmpty: validators.notEmpty('id'),
        isInt: validators.isInt('id'),
        custom: validators.existResourceById('id', FileData),
        // Sanitizers
        toInt: true
    },
});

const updateFileDataMiddleware = checkSchema({
    id: {
        in: ['params'],
        exists: validators.exists('id'),
        trim: true,
        notEmpty: validators.notEmpty('id'),
        isInt: validators.isInt('id'),
        custom: validators.existResourceById('id', FileData),
        // Sanitizers
        toInt: true
    },
});

module.exports = {
    getOneFileDataMiddleware,
    updateFileDataMiddleware
};