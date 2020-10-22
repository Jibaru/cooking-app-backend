const { checkSchema  } = require('express-validator');
const { RecipeStatus } = require('../../models/index');
const { 
    isRequiredErrorMessage,
    isEmptyErrorMessage,
    isNotTypeErrorMessage,
    notFoundErrorMessage
} = require('../utils/error_templates');

const getOneRecipeStatusMiddleware = checkSchema({
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
                return RecipeStatus.findByPk(value)
                    .then(recipeStatus => {
                        if (recipeStatus === null || recipeStatus === undefined) {
                            return Promise.reject(notFoundErrorMessage('id', value));
                        }
                    });
            }
        },
        // Sanitizers
        toInt: true
    },
})

module.exports = {
    getOneRecipeStatusMiddleware
};