
/// Check if object exists and type of this is object
const existsAndIsObject = (object) => {
	return (object !== null && object !== undefined && !Array.isArray(object) && typeof object === 'object');
}

const existOnce = (...objects) => {
    if (objects == undefined || objects == null) {
        return false;
    }

    for (let object of objects) {
        if (object != null || object != undefined) {
            return true;
        }
    }
    return false;
}

module.exports = {
    existsAndIsObject,
    existOnce,
}