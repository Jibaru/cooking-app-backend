const { checkSchema  } = require('express-validator');
const { RecipeType } = require('../../models/index');
const validators = require('../validators/validators');

const createRecipeTypeMiddleware = checkSchema({
    name: {
        in: ['body'],
        trim: true,
        notEmpty: validators.notEmpty('name'),
        isNumeric: validators.isNumericAndNotString('name'),
        isLength: validators.isMaxLength('name', 45),
        exists: validators.exists('name'),
        custom: validators.existResourceByField('name', RecipeType),
    },
    description: {
        in: ['body'],
        optional: true,
        trim: true,
        notEmpty: validators.notEmpty('description'),
        isNumeric: validators.isNumericAndNotString('description'),
        isLength: validators.isMaxLength('description', 65535),
        // Sanitizers
        trim: true,
    },
});

const deleteRecipeTypeMiddleware = checkSchema({
    id: {
        in: ['params'],
        exists: validators.exists('id'),
        trim: true,
        notEmpty: validators.notEmpty('id'),
        isInt: validators.isInt('id'),
        custom: validators.existResourceById('id', RecipeType),
        // Sanitizers
        toInt: true
    },
});

const getOneRecipeTypeMiddleware = checkSchema({
    id: {
        in: ['params'],
        exists: validators.exists('id'),
        trim: true,
        notEmpty: validators.notEmpty('id'),
        isInt: validators.isInt('id'),
        custom: validators.existResourceById('id', RecipeType),
        // Sanitizers
        toInt: true
    },
});

module.exports = {
    createRecipeTypeMiddleware,
    deleteRecipeTypeMiddleware,
    getOneRecipeTypeMiddleware
};