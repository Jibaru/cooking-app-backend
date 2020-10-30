const { existsAndIsObject } = require('../utils/object_extension');
const { 
    isNotTypeErrorMessage, 
    isEmptyErrorMessage, 
    isRequiredErrorMessage,
    maxLengthErrorMessage,
    notFoundErrorMessage,
    existsErrorMessage
} = require('../utils/error_templates');

const mergeOptions = (into, from) => existsAndIsObject(from) 
? Object.assign(into, from) 
: into;

const exists = (field, options) => {
    let defaultObject = {
        errorMessage: isRequiredErrorMessage(field),
    };

    return mergeOptions(defaultObject, options);
};

const notEmpty = (field, options) => {
    let defaultObject = {
        errorMessage: isEmptyErrorMessage(field)
    };

    return mergeOptions(defaultObject, options);
};

const isInt = (field, options) => {
    let defaultObject = {errorMessage: isNotTypeErrorMessage(field, 'integer')};
    return mergeOptions(defaultObject, options);
};

const existResourceById = (field, model, options) => {
    let defaultObject = {
        options: (value, {req, location, path}) => { 
            return model.findByPk(value)
                .then(result => {
                    if (result === null || result === undefined) {
                        return Promise.reject(notFoundErrorMessage(field, value));
                    }
                });
        }
    };

    return mergeOptions(defaultObject, options);
};

const existResourceByField = (field, model, options) => {
    
    function createWhere(value) {
        const where = {};
        Object.defineProperty(where, field, {
            value: value,
            writable: true,
            enumerable: true,
            configurable: true
        });
        return where;
    }

    let defaultObject = {
        options: (value, {req, location, path}) => {
            return model.findOne({
                where: createWhere(value),
            })
            .then(result => {
                if(!!result){
                    return Promise.reject(existsErrorMessage(field, value));
                }
            });
        }
    };

    return mergeOptions(defaultObject, options);
}

const isMaxLength = (field, max, options) => {
    let defaultObject = {
        errorMessage: maxLengthErrorMessage(field, max),
        options: {
            max: max
        }
    };
    return mergeOptions(defaultObject, options);
};

module.exports = {
    exists,
    notEmpty,
    isInt,
    existResourceById,
    existResourceByField,
    isMaxLength,
}