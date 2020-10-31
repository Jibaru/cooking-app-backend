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
    name: {
        in: ['body'],
        optional: true,
        // Sanitizers
        trim: true,
        exists: validators.exists('name'),
        notEmpty: validators.notEmpty('name'),
        isNumeric: validators.isNumericAndNotString('name'),
        custom: validators.existResourceByField('name', FileData),
        isLength: validators.isMaxLength('name', 80),
    },
    mimeType: {
        in: ['body'],
        optional: true,
        // Sanitizers
        trim: true,
        exists: validators.exists('mimeType'),
        notEmpty: validators.notEmpty('mimeType'),
        isLength: validators.isMaxLength('mimeType', 30),
        custom: validators.isNotFormat('mimeType', 'tipo/subtipo'),
    }
});

module.exports = {
    getOneFileDataMiddleware,
    updateFileDataMiddleware
};