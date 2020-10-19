const { checkSchema  } = require('express-validator');
const { 
    FileData,
    Instruction,
    Recipe,
    RecipeCuisine,
    RecipeType,
    User,
    RecipeStatus
} = require('../../models/index');

const { 
    isEmptyErrorMessage,
    isNotTypeErrorMessage,
    notFoundErrorMessage,
    maxLengthErrorMessage,
    isRequiredErrorMessage
} = require('../utils/error_templates');

const recipeValidators = {
    recipeImageId: {
        in: ['body'],
        optional: true,
        isInt: {
            errorMessage: isNotTypeErrorMessage('recipeImageId', 'integer')
        },
        notEmpty: {
            errorMessage: isEmptyErrorMessage('recipeImageId')
        },
        custom: {
            options: (value, {req, location, path}) => { 
                return FileData.findByPk(value)
                    .then(fileData => {
                        if (fileData === null || fileData === undefined) {
                            return Promise.reject(notFoundErrorMessage('recipeImageId', value));
                        }
                    });
            }
        },
        // Sanitizers
        toInt: true
    },
    recipeStatusId: {
        in: ['body'],
        optional: true,
        isInt: {
            errorMessage: isNotTypeErrorMessage('recipeStatusId', 'integer')
        },
        notEmpty: {
            errorMessage: isEmptyErrorMessage('recipeStatusId')
        },
        custom: {
            options: (value, {req, location, path}) => { 
                return RecipeStatus.findByPk(value)
                    .then(recipeStatus => {
                        if (recipeStatus === null || recipeStatus === undefined) {
                            return Promise.reject(notFoundErrorMessage('recipeStatusId', value));
                        }
                    });
            }
        },
        // Sanitizers
        toInt: true
    },
    instructionId: {
        in: ['body'],
        optional: true,
        isInt: {
            errorMessage: isNotTypeErrorMessage('instructionId', 'integer')
        },
        notEmpty: {
            errorMessage: isEmptyErrorMessage('instructionId')
        },
        custom: {
            options: (value, {req, location, path}) => { 
                return Instruction.findByPk(value)
                    .then(instruction => {
                        if (instruction === null || instruction === undefined) {
                            return Promise.reject(notFoundErrorMessage('instructionId', value));
                        }
                    });
            }
        },
        // Sanitizers
        toInt: true
    },
    createdById: {
        in: ['body'],  
        optional: true,
        isInt: {
            errorMessage: isNotTypeErrorMessage('createdById', 'integer')
        },
        notEmpty: {
            errorMessage: isEmptyErrorMessage('createdById')
        },
        custom: {
            options: (value, {req, location, path}) => { 
                return User.findByPk(value)
                    .then(user => {
                        if (user === null || user === undefined) {
                            return Promise.reject(notFoundErrorMessage('createdById', value));
                        }
                    });
            }
        },
        // Sanitizers
        toInt: true
    },
    recipeCuisineId: {
        in: ['body'],
        optional: true,
        isInt: {
            errorMessage: isNotTypeErrorMessage('recipeCuisineId', 'integer')
        },
        notEmpty: {
            errorMessage: isEmptyErrorMessage('recipeCuisineId')
        },
        custom: {
            options: (value, {req, location, path}) => { 
                return RecipeCuisine.findByPk(value)
                    .then(recipeCuisine => {
                        if (recipeCuisine === null || recipeCuisine === undefined) {
                            return Promise.reject(notFoundErrorMessage('recipeCuisineId', value));
                        }
                    });
            }
        },
        // Sanitizers
        toInt: true
    },
    recipeTypeId: {
        in: ['body'],
        optional: true,
        isInt: {
            errorMessage: isNotTypeErrorMessage('recipeTypeId', 'integer')
        },
        notEmpty: {
            errorMessage: isEmptyErrorMessage('recipeTypeId')
        },
        custom: {
            options: (value, {req, location, path}) => { 
                return RecipeType.findByPk(value)
                    .then(recipeType => {
                        if (recipeType === null || recipeType === undefined) {
                            return Promise.reject(notFoundErrorMessage('recipeTypeId', value));
                        }
                    });
            }
        },
        // Sanitizers
        toInt: true
    },
    dateTimePublished: {
        in: ['body'],
        optional: true,
        isDate: {
            errorMessage: isNotTypeErrorMessage('dateTimePublished', 'date'),
        },
        // Sanitizers
        toDate: true
    },
    title: {
        in: ['body'],
        exists: {
            errorMessage: isRequiredErrorMessage('title')
        },
        notEmpty: {
            errorMessage: isEmptyErrorMessage('title')
        },
        isNumeric: {
            negated: true,
            errorMessage: isNotTypeErrorMessage('title', 'string')
        },
        isLength: {
            errorMessage: maxLengthErrorMessage('title', 45),
            options: {
                max: 45
            }
        },
        // Sanitizers
        trim: true,
    },
    description: {
        in: ['body'],
        exists: {
            errorMessage: isRequiredErrorMessage('description')
        },
        notEmpty: {
            errorMessage: isEmptyErrorMessage('description')
        },
        isNumeric: {
            negated: true,
            errorMessage: isNotTypeErrorMessage('title', 'string')
        },
        isLength: {
            errorMessage: maxLengthErrorMessage('description', 65535),
            options: {
                max: 65535
            }
        },
        // Sanitizers
        trim: true,
    },
    yield: {
        in: ['body'],
        optional: true,
        isInt: {
            errorMessage: isNotTypeErrorMessage('yield', 'integer')
        },
        notEmpty: {
            errorMessage: isEmptyErrorMessage('yield')
        },
        // Sanitizers
        toInt: true
    },
    prepTime: {
        in: ['body'],
        exists: {
            errorMessage: isRequiredErrorMessage('prepTime')
        },
        isInt: {
            errorMessage: isNotTypeErrorMessage('prepTime', 'integer')
        },
        notEmpty: {
            errorMessage: isEmptyErrorMessage('prepTime')
        },
        // Sanitizers
        toInt: true
    },
    cookTime: {
        in: ['body'],
        exists: {
            errorMessage: isRequiredErrorMessage('cookTime')
        },
        isInt: {
            errorMessage: isNotTypeErrorMessage('cookTime', 'integer')
        },
        notEmpty: {
            errorMessage: isEmptyErrorMessage('cookTime')
        },
        // Sanitizers
        toInt: true
    }, 
    id: {
        in: ['params'],
        exists: {
            errorMessage: isRequiredErrorMessage('id')
        },
        notEmpty: {
            errorMessage: isEmptyErrorMessage('id')
        },
        isInt: {
            errorMessage: isNotTypeErrorMessage('id', 'integer')
        },
        custom: {
            options: (value, {req, location, path}) => { 
                return Recipe.findByPk(value)
                    .then(recipe => {
                        if (recipe === null || recipe === undefined) {
                            return Promise.reject(notFoundErrorMessage('id', value));
                        }
                    });
            }
        },
        // Sanitizers
        toInt: true
    },
};

const createRecipeMiddleware = checkSchema({
    recipeImageId: recipeValidators.recipeImageId,
    recipeStatusId: recipeValidators.recipeStatusId,
    instructionId: recipeValidators.instructionId,
    createdById: recipeValidators.createdById,
    recipeCuisineId: recipeValidators.recipeCuisineId,
    recipeTypeId: recipeValidators.recipeTypeId,
    dateTimePublished: recipeValidators.dateTimePublished,
    title: recipeValidators.title,
    description: recipeValidators.description,
    yield: recipeValidators.yield,
    prepTime: recipeValidators.prepTime,
    cookTime: recipeValidators.cookTime,
});

const getOneRecipeMiddleware = checkSchema({
    id: recipeValidators.id,
});

const updateRecipeMiddleware = checkSchema({
    id: recipeValidators.id,
    recipeImageId: recipeValidators.recipeImageId,
    recipeStatusId: recipeValidators.recipeStatusId,
    instructionId: recipeValidators.instructionId,
    createdById: recipeValidators.createdById,
    recipeCuisineId: recipeValidators.recipeCuisineId,
    recipeTypeId: recipeValidators.recipeTypeId,
    dateTimePublished: recipeValidators.dateTimePublished,
    title: recipeValidators.title,
    description: recipeValidators.description,
    yield: recipeValidators.yield,
    prepTime: recipeValidators.prepTime,
    cookTime: recipeValidators.cookTime,
});

module.exports = {
    createRecipeMiddleware,
    getOneRecipeMiddleware,
    updateRecipeMiddleware
};