
const fromExpressValidator = (expressValidatorError) => {
    return toErrorFormat(expressValidatorError);
}

const toErrorFormat = (error) => {
    
    if (!error)
        return null;
    
    return {
        value: error.value,
        msg: error.msg,
        param: error.param,
        location: error.location
    };
}

module.exports = {
    fromExpressValidator,
    toErrorFormat,
}