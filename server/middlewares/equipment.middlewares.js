const { checkSchema  } = require('express-validator');

const isTypeErrorMessage = (campo, type) => `El parámetro ${campo} debe ser un ${type}`
const isEmptyErrorMessage = campo => `El parámetro ${campo} no puede estar vacío`;
const isRequiredErrorMessage = campo => `El parámetro ${campo} es requerido`;

const createEquipmentMiddleware = checkSchema({
    imageId: {
        in: ['body'],
        isInt: {
            errorMessage: isTypeErrorMessage('imageId', 'integer'),
        },
        isEmpty: {
            errorMessage: isEmptyErrorMessage('imageId')
        },
        
    },
    name: {
        in: ['body'],
        isEmpty: {
            errorMessage: isEmptyErrorMessage('name')
        },
        isString: {
            errorMessage: isTypeErrorMessage('name', 'string')
        },
    },
    
});

module.exports = {
    createEquipmentMiddleware
}