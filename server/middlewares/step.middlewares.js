const { checkSchema  } = require('express-validator');
const { Step } = require('../../models/index');
const validators = require('../validators/validators');
/*const { 
    isRequiredErrorMessage,
    isEmptyErrorMessage,
    isNotTypeErrorMessage,
    notFoundErrorMessage
} = require('../utils/error_templates');*/

const getOneStepMiddleware = checkSchema({
    id: {
        in: ['params'],
        exists: validators.exists('id'),
        trim: true,
        notEmpty: validators.notEmpty('id'),
        isInt: validators.isInt('id'),
        custom: validators.existResourceById('id', Step),
        // Sanitizers
        toInt: true
    },
});

module.exports = {
    getOneStepMiddleware
};