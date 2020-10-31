const { checkSchema  } = require('express-validator');
const { RecipeStatus } = require('../../models/index');
const validators = require('../validators/validators');

const getOneRecipeStatusMiddleware = checkSchema({
    id: {
        in: ['params'],
        exists: validators.exists('id'),
        trim: true,
        notEmpty: validators.notEmpty('id'),
        isInt: validators.isInt('id'),
        custom: validators.existResourceById('id', RecipeStatus),
        // Sanitizers
        toInt: true
    },
})

module.exports = {
    getOneRecipeStatusMiddleware
};