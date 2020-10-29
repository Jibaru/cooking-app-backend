
/// param array|object
/// return object|array without nulls
const toResponseFormat = (object) => {
    if (object === null || object === undefined) {
        return null;
    }

    if (Array.isArray(object)) {
        return arrayToResponseFormat(object);
    }

    if (typeof object === 'object') {
        return objectToResponseFormat(object);
    }

    return object;
};

const objectToResponseFormat = (object) => {
    Object.keys(object).forEach(key => { 
        if (object[key] === null || object[key] === undefined) {
            delete object[key];
        } else if (Array.isArray(object[key])) {
            object[key] = arrayToResponseFormat(object[key]);
        } else if (typeof object[key] === 'object') {
            objectToResponseFormat(object[key]);
            if (Object.keys(object[key]).length === 0) {
                delete object[key];
            }
        }
    });
    return object;
};

const arrayToResponseFormat = (array) => {
    let newArray = [];
    for (let item of array) {
        if (item !== null && item !== undefined) {
            if (Array.isArray(item)) {
                newArray.push(arrayToResponseFormat(item));
            } else if (typeof item === 'object') {
                objectToResponseFormat(item)
                if (Object.keys(item).length !== 0) {
                    newArray.push(item);    
                }
            } else {
                newArray.push(item);
            }
        }
    }
    return newArray;
};

module.exports = {
    toResponseFormat
};
