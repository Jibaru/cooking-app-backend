const { checkSchema  } = require('express-validator');
const { RecipeCuisine } = require('../../models/index');
const validators = require('../validators/validators');

const createRecipeCuisineMiddleware = checkSchema({
    hash: {
        in: ['body'],
        trim: true,
        notEmpty: validators.notEmpty('hash'),
        isNumeric: validators.isNumericAndNotString('hash'),
        isLength: validators.isMaxLength('hash', 10),
        exists: validators.exists('hash'),
        custom: validators.existResourceByField('hash', RecipeCuisine),
    },
    originalName: {
        in: ['body'],
        trim: true,
        notEmpty: validators.notEmpty('originalName'),
        isNumeric: validators.isNumericAndNotString('originalName'),
        isLength: validators.isMaxLength('originalName', 45),
        exists: validators.exists('originalName'),
        custom: validators.existResourceByField('originalName', RecipeCuisine),
    },
    name: {
        in: ['body'],
        trim: true,
        notEmpty: validators.notEmpty('name'),
        isNumeric: validators.isNumericAndNotString('name'),
        isLength: validators.isMaxLength('name', 45),
        exists: validators.exists('name'),
        custom: validators.existResourceByField('name', RecipeCuisine),
    },
    region: {
        in: ['body'],
        optional: true,
        trim: true,
        notEmpty: validators.notEmpty('region'),
        isNumeric: validators.isNumericAndNotString('region'),
        isLength: validators.isMaxLength('region', 45),
    }
});

const deleteRecipeCuisineMiddleware = checkSchema({
    id: {
        in: ['params'],
        exists: validators.exists('id'),
        trim: true,
        notEmpty: validators.notEmpty('id'),
        isInt: validators.isInt('id'),
        custom: validators.existResourceById('id', RecipeCuisine),
        // Sanitizers
        toInt: true
    },
});

const getOneRecipeCuisineMiddleware = checkSchema({
    id: {
        in: ['params'],
        exists: validators.exists('id'),
        trim: true,
        notEmpty: validators.notEmpty('id'),
        isInt: validators.isInt('id'),
        custom: validators.existResourceById('id', RecipeCuisine),
        // Sanitizers
        toInt: true
    },
});

module.exports = {
    createRecipeCuisineMiddleware,
    deleteRecipeCuisineMiddleware,
    getOneRecipeCuisineMiddleware
};