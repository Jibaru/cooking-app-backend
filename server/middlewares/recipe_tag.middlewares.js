const { checkSchema  } = require('express-validator');
const { RecipeTag } = require('../../models/index');
const validators = require('../validators/validators');

const createRecipeTagMiddleware = checkSchema({
    hash: {
        in: ['body'],
        trim: true,
        notEmpty: validators.notEmpty('hash'),
        isNumeric: validators.isNumericAndNotString('hash'),
        isLength: validators.isMaxLength('hash', 10),
        exists: validators.exists('hash'),
        custom: validators.existResourceByField('hash', RecipeTag),
    },
    originalName: {
        in: ['body'],
        trim: true,
        notEmpty: validators.notEmpty('originalName'),
        isNumeric: validators.isNumericAndNotString('originalName'),
        isLength: validators.isMaxLength('originalName', 45),
        exists: validators.exists('originalName'),
        custom: validators.existResourceByField('originalName', RecipeTag),
    },
    name: {
        in: ['body'],
        trim: true,
        notEmpty: validators.notEmpty('name'),
        isNumeric: validators.isNumericAndNotString('name'),
        isLength: validators.isMaxLength('name', 45),
        exists: validators.exists('name'),
        custom: validators.existResourceByField('name', RecipeTag),
    },
});

const deleteRecipeTagMiddleware = checkSchema({
    id: {
        in: ['params'],
        exists: validators.exists('id'),
        trim: true,
        notEmpty: validators.notEmpty('id'),
        isInt: validators.isInt('id'),
        custom: validators.existResourceById('id', RecipeTag),
        // Sanitizers
        toInt: true
    },
});

const getOneRecipeTagMiddleware = checkSchema({
    id: {
        in: ['params'],
        exists: validators.exists('id'),
        trim: true,
        notEmpty: validators.notEmpty('id'),
        isInt: validators.isInt('id'),
        custom: validators.existResourceById('id', RecipeTag),
        // Sanitizers
        toInt: true
    },
});

module.exports = {
    createRecipeTagMiddleware,
    deleteRecipeTagMiddleware,
    getOneRecipeTagMiddleware
};