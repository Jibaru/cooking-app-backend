const { checkSchema  } = require('express-validator');
const { RecipeStatus } = require('../../models/index');
const validators = require('../validators/validators');
/*const { 
    isRequiredErrorMessage,
    isEmptyErrorMessage,
    isNotTypeErrorMessage,
    notFoundErrorMessage
} = require('../utils/error_templates');*/

const getOneRecipeStatusMiddleware = checkSchema({
    id: {
        in: ['params'],
        exists: validators.exists('id'),
        trim: true,
        notEmpty: validators.notEmpty('id'),
        isInt: validators.notEmpty('id'),
        custom: validators.existResourceById('id', RecipeStatus),
        // Sanitizers
        toInt: true
    },
})

module.exports = {
    getOneRecipeStatusMiddleware
};