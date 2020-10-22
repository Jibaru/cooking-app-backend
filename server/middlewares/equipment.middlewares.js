const { checkSchema  } = require('express-validator');
const { FileData, Equipment } = require('../../models/index');
const { 
    isNotTypeErrorMessage, 
    isEmptyErrorMessage, 
    isRequiredErrorMessage,
    maxLengthErrorMessage,
    notFoundErrorMessage,
    existsErrorMessage
} = require('../utils/error_templates');

const equipmentValidators = {
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
                return Equipment.findByPk(value)
                    .then(equipment => {
                        if (equipment === null || equipment === undefined) {
                            return Promise.reject(notFoundErrorMessage('id', value));
                        }
                    });
            }
        },
        // Sanitizers
        toInt: true
    },
    imageId: {
        in: ['body'],
        optional: true,
        trim: true,
        isInt: {
            errorMessage: isNotTypeErrorMessage('imageId', 'integer')
        },
        notEmpty: {
            errorMessage: isEmptyErrorMessage('imageId')
        },
        custom: {
            options: (value, {req, location, path}) => { 
                return FileData.findByPk(value)
                    .then(fileData => {
                        if (fileData === null || fileData === undefined) {
                            return Promise.reject(notFoundErrorMessage('imageId', value));
                        }
                    });
            }
        },
        // Sanitizers
        toInt: true
    },
    name: optional => {
        return {
            in: ['body'],
            optional,
            exists: {
                errorMessage: isRequiredErrorMessage('name')
            },
            // Sanitizers
            trim: true,
            notEmpty: {
                errorMessage: isEmptyErrorMessage('name'),
            },
            isLength: {
                errorMessage: maxLengthErrorMessage('name', 45),
                options: {  
                    max: 45
                }
            },
            custom: {
                options: (value, {req, location, path}) => {
                    return Equipment.findOne({
                        where: {
                            name: value
                        }
                    })
                    .then(model => {
                        if(!!model){
                            return Promise.reject(existsErrorMessage('name', value));
                        }
                    });
                }
            },
            
        }
    },
    description: {
        optional: true,
        // Sanitizers
        trim: true,
        notEmpty: {
            errorMessage: isEmptyErrorMessage('description')
        },
        isLength: {
            errorMessage: maxLengthErrorMessage('description', 65535),
            options: {
                max: 65535
            }
        },
    }
}

const createEquipmentMiddleware = checkSchema({
    imageId: equipmentValidators.imageId,
    name: equipmentValidators.name(false),
    description: equipmentValidators.description
});

const deleteEquipmentMiddleware = checkSchema({
    id: equipmentValidators.id
});

const getOneEquipmentMiddleware = checkSchema({
    id: equipmentValidators.id
});

const updateEquipmentMiddleware = checkSchema({
    id: equipmentValidators.id,
    imageId: equipmentValidators.imageId,
    name: equipmentValidators.name(true),
    description: equipmentValidators.description
});

module.exports = {
    createEquipmentMiddleware,
    deleteEquipmentMiddleware,
    getOneEquipmentMiddleware,
    updateEquipmentMiddleware
}