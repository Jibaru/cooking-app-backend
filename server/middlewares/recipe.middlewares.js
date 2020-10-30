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
const validators = require('../validators/validators');

/*const { 
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
        trim: true,
        notEmpty: {
            errorMessage: isEmptyErrorMessage('recipeImageId')
        },
        isInt: {
            errorMessage: isNotTypeErrorMessage('recipeImageId', 'integer')
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
        trim: true,
        notEmpty: {
            errorMessage: isEmptyErrorMessage('recipeStatusId')
        },
        isInt: {
            errorMessage: isNotTypeErrorMessage('recipeStatusId', 'integer')
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
        trim: true,
        notEmpty: {
            errorMessage: isEmptyErrorMessage('instructionId')
        },
        isInt: {
            errorMessage: isNotTypeErrorMessage('instructionId', 'integer')
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
        trim: true,
        notEmpty: {
            errorMessage: isEmptyErrorMessage('createdById')
        },
        isInt: {
            errorMessage: isNotTypeErrorMessage('createdById', 'integer')
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
        trim: true,
        notEmpty: {
            errorMessage: isEmptyErrorMessage('recipeCuisineId')
        },
        isInt: {
            errorMessage: isNotTypeErrorMessage('recipeCuisineId', 'integer')
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
        trim: true,
        notEmpty: {
            errorMessage: isEmptyErrorMessage('recipeTypeId')
        },
        isInt: {
            errorMessage: isNotTypeErrorMessage('recipeTypeId', 'integer')
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
        trim: true,
        isDate: {
            errorMessage: isNotTypeErrorMessage('dateTimePublished', 'date'),
        },
        // Sanitizers
        toDate: true
    },
    title: optional => {
        return {
            in: ['body'],
            optional,
            exists: {
                errorMessage: isRequiredErrorMessage('title')
            },
            trim: true,
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
        }
    },
    description: optional => {
        return {
            in: ['body'],
            optional,
            exists: {
                errorMessage: isRequiredErrorMessage('description')
            },
            trim: true,
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
        }
    },
    yield: {
        in: ['body'],
        optional: true,
        trim: true,
        notEmpty: {
            errorMessage: isEmptyErrorMessage('yield')
        },
        isInt: {
            errorMessage: isNotTypeErrorMessage('yield', 'integer')
        },
        // Sanitizers
        toInt: true
    },
    prepTime: optional => {
        return {
            in: ['body'],
            optional,
            exists: {
                errorMessage: isRequiredErrorMessage('prepTime')
            },
            trim: true,
            notEmpty: {
                errorMessage: isEmptyErrorMessage('prepTime')
            },
            isInt: {
                errorMessage: isNotTypeErrorMessage('prepTime', 'integer')
            },
            // Sanitizers
            toInt: true
        }
    },
    cookTime: optional => {
        return {
            in: ['body'],
            optional,
            exists: {
                errorMessage: isRequiredErrorMessage('cookTime')
            },
            trim: true,
            notEmpty: {
                errorMessage: isEmptyErrorMessage('cookTime')
            },
            isInt: {
                errorMessage: isNotTypeErrorMessage('cookTime', 'integer')
            },
            // Sanitizers
            toInt: true
        }
    }, 
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
};*/

const createRecipeMiddleware = checkSchema({
    recipeImageId: {
        in: ['body'],
        optional: true,
        trim: true,
        notEmpty: validators.notEmpty('recipeImageId'),
        isInt: validators.isInt('recipeImageId'),
        custom: validators.existResourceById('recipeImageId', FileData),
        // Sanitizers
        toInt: true
    },
    recipeStatusId: {
        in: ['body'],
        optional: true,
        trim: true,
        notEmpty: validators.notEmpty('recipeStatusId'),
        isInt: validators.isInt('recipeStatusId'),
        custom: validators.existResourceById('recipeStatusId', RecipeStatus),
        // Sanitizers
        toInt: true
    },
    instructionId: {
        in: ['body'],
        optional: true,
        trim: true,
        notEmpty: validators.notEmpty('instructionId'),
        isInt: validators.isInt('instructionId'),
        custom: validators.existResourceById('instructionId', Instruction),
        // Sanitizers
        toInt: true
    },
    createdById: {
        in: ['body'],
        optional: true,
        trim: true,
        notEmpty: validators.notEmpty('createdById'),
        isInt: validators.isInt('createdById'),
        custom: validators.existResourceById('createdById', User),
        // Sanitizers
        toInt: true
    },
    recipeCuisineId: {
        in: ['body'],
        optional: true,
        trim: true,
        notEmpty: validators.notEmpty('recipeCuisineId'),
        isInt: validators.isInt('recipeCuisineId'),
        custom: validators.existResourceById('recipeCuisineId', RecipeCuisine),
        // Sanitizers
        toInt: true
    },
    recipeTypeId: {
        in: ['body'],
        optional: true,
        trim: true,
        notEmpty: validators.notEmpty('recipeTypeId'),
        isInt: validators.isInt('recipeTypeId'),
        custom: validators.existResourceById('recipeTypeId', RecipeType),
        // Sanitizers
        toInt: true
    },
    dateTimePublished: {
        in: ['body'],
        optional: true,
        trim: true,
        isDate: validators.isDate('dateTimePublished'),
        // Sanitizers
        toDate: true
    },
    title: {
        in: ['body'],
        optional: false,
        exists: validators.exists('title'),
        trim: true,
        notEmpty: validators.notEmpty('title'),
        isNumeric: validators.isNumericAndNotString('title'),
        isLength: validators.isMaxLength('title', 45),
    },
    description: {
        in: ['body'],
        optional: false,
        exists: validators.exists('description'),
        trim: true,
        notEmpty: validators.notEmpty('description'),
        isNumeric: validators.isNumericAndNotString('description'),
        isLength: validators.isMaxLength('description', 65535),
    },
    yield: {
        in: ['body'],
        optional: true,
        trim: true,
        notEmpty: validators.notEmpty('yield'),
        isInt: validators.isInt('yield'),
        // Sanitizers
        toInt: true
    },
    prepTime: {
        in: ['body'],
        optional: false,
        exists: validators.exists('prepTime'),
        trim: true,
        notEmpty: validators.notEmpty('prepTime'),
        isInt: validators.isInt('prepTime'),
        // Sanitizers
        toInt: true
    },
    cookTime: {
        in: ['body'],
        optional: false,
        exists: validators.exists('cookTime'),
        trim: true,
        notEmpty: validators.notEmpty('cookTime'),
        isInt: validators.isInt('cookTime'),
        // Sanitizers
        toInt: true
    },
});

const getOneRecipeMiddleware = checkSchema({
    id: {
        in: ['params'],
        exists: validators.exists('id'),
        trim: true,
        notEmpty: validators.notEmpty('id'),
        isInt: validators.isInt('id'),
        custom: validators.existResourceById('id', Recipe),
        // Sanitizers
        toInt: true
    },
});

const updateRecipeMiddleware = checkSchema({
    id: {
        in: ['params'],
        exists: validators.exists('id'),
        trim: true,
        notEmpty: validators.notEmpty('id'),
        isInt: validators.isInt('id'),
        custom: validators.existResourceById('id', Recipe),
        // Sanitizers
        toInt: true
    },
    recipeImageId: {
        in: ['body'],
        optional: true,
        trim: true,
        notEmpty: validators.notEmpty('recipeImageId'),
        isInt: validators.isInt('recipeImageId'),
        custom: validators.existResourceById('recipeImageId', FileData),
        // Sanitizers
        toInt: true
    },
    recipeStatusId: {
        in: ['body'],
        optional: true,
        trim: true,
        notEmpty: validators.notEmpty('recipeStatusId'),
        isInt: validators.isInt('recipeStatusId'),
        custom: validators.existResourceById('recipeStatusId', RecipeStatus),
        // Sanitizers
        toInt: true
    },
    instructionId: {
        in: ['body'],
        optional: true,
        trim: true,
        notEmpty: validators.notEmpty('instructionId'),
        isInt: validators.isInt('instructionId'),
        custom: validators.existResourceById('instructionId', Instruction),
        // Sanitizers
        toInt: true
    },
    createdById: {
        in: ['body'],
        optional: true,
        trim: true,
        notEmpty: validators.notEmpty('createdById'),
        isInt: validators.isInt('createdById'),
        custom: validators.existResourceById('createdById', User),
        // Sanitizers
        toInt: true
    },
    recipeCuisineId: {
        in: ['body'],
        optional: true,
        trim: true,
        notEmpty: validators.notEmpty('recipeCuisineId'),
        isInt: validators.isInt('recipeCuisineId'),
        custom: validators.existResourceById('recipeCuisineId', RecipeCuisine),
        // Sanitizers
        toInt: true
    },
    recipeTypeId: {
        in: ['body'],
        optional: true,
        trim: true,
        notEmpty: validators.notEmpty('recipeTypeId'),
        isInt: validators.isInt('recipeTypeId'),
        custom: validators.existResourceById('recipeTypeId', RecipeType),
        // Sanitizers
        toInt: true
    },
    dateTimePublished: {
        in: ['body'],
        optional: true,
        trim: true,
        isDate: validators.isDate('dateTimePublished'),
        // Sanitizers
        toDate: true
    },
    title: {
        in: ['body'],
        optional: true,
        exists: validators.exists('title'),
        trim: true,
        notEmpty: validators.notEmpty('title'),
        isNumeric: validators.isNumericAndNotString('title'),
        isLength: validators.isMaxLength('title', 45),
    },
    description: {
        in: ['body'],
        optional: true,
        exists: validators.exists('description'),
        trim: true,
        notEmpty: validators.notEmpty('description'),
        isNumeric: validators.isNumericAndNotString('description'),
        isLength: validators.isMaxLength('description', 65535),
    },
    yield: {
        in: ['body'],
        optional: true,
        trim: true,
        notEmpty: validators.notEmpty('yield'),
        isInt: validators.isInt('yield'),
        // Sanitizers
        toInt: true
    },
    prepTime: {
        in: ['body'],
        optional: true,
        exists: validators.exists('prepTime'),
        trim: true,
        notEmpty: validators.notEmpty('prepTime'),
        isInt: validators.isInt('prepTime'),
        // Sanitizers
        toInt: true
    },
    cookTime: {
        in: ['body'],
        optional: true,
        exists: validators.exists('cookTime'),
        trim: true,
        notEmpty: validators.notEmpty('cookTime'),
        isInt: validators.isInt('cookTime'),
        // Sanitizers
        toInt: true
    },
});

module.exports = {
    createRecipeMiddleware,
    getOneRecipeMiddleware,
    updateRecipeMiddleware
};