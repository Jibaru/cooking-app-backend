const validates = require('../validators/validators');
const { checkSchema  } = require('express-validator');
const { Equipment, Status } = require('../../models/index');

const createEquipmentMiddleware = checkSchema({
    name: {
        in: ['body'],
        exists: validates.exists('name'),
        trim: true,
        notEmpty: validates.notEmpty('name'),
        isLength: validates.isMaxLength('name', 45),
        custom: validates.existResourceByField('name', Equipment),
        
    },
    description: {
        in: ['body'],
        optional: true,
        trim: true,
        notEmpty: validates.notEmpty('description'),
        isLength: validates.isMaxLength('description', 65535)
    },
    image: {
        in: ['body'],
        optional: false,
        notEmpty: validates.notEmpty('image'),
    }
});

const deleteEquipmentMiddleware = checkSchema({
    id: {
        in: ['params'],
        exists: validates.exists('id'),
        trim: true,
        notEmpty: validates.notEmpty('id'),
        isInt: validates.isInt('id'),
        custom: validates.existResourceById('id', Equipment),
        toInt: true
    }
});

const getOneEquipmentMiddleware = checkSchema({
    id: {
        in: ['params'],
        exists: validates.exists('id'),
        trim: true,
        notEmpty: validates.notEmpty('id'),
        isInt: validates.isInt('id'),
        custom: validates.existResourceById('id', Equipment),
        toInt: true
    }
});

const updateEquipmentMiddleware = checkSchema({
    id: {
        in: ['params'],
        exists: validates.exists('id'),
        trim: true,
        notEmpty: validates.notEmpty('id'),
        isInt: validates.isInt('id'),
        custom: validates.existResourceById('id', Equipment),
        toInt: true
    },
    name: {
        in: ['body'],
        optional: true,
        exists: validates.exists('name'),
        trim: true,
        notEmpty: validates.notEmpty('name'),
        isLength: validates.isMaxLength('name', 45),
        custom: validates.existResourceByField('name', Equipment),
        
    },
    description: {
        optional: true,
        trim: true,
        notEmpty: validates.notEmpty('description'),
        isLength: validates.isMaxLength('description', 65535)
    },
    statusId: {
        in: ['body'],
        optional: true,
        trim: true,
        isInt: validates.isInt('statusId'),
        notEmpty: validates.notEmpty('statusId'),
        custom: validates.existResourceById('statusId', Status),
        // Sanitizers
        toInt: true
    },
    image: {
        in: ['body'],
        optional: true,
        notEmpty: validates.notEmpty('image'),
    },
});

module.exports = {
    createEquipmentMiddleware,
    deleteEquipmentMiddleware,
    getOneEquipmentMiddleware,
    updateEquipmentMiddleware
};