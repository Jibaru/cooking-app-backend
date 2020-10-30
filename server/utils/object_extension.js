
/// Check if object exists and type of this is object
const existsAndIsObject = (object) => {
	return (object !== null && object !== undefined && !Array.isArray(object) && typeof object === 'object');
}

module.exports = {
    existsAndIsObject,
}