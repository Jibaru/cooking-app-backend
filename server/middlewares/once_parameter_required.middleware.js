const { toErrorFormat } = require('../utils/error_formatter');
const { onceParameterRequiredErrorMessage } = require('../utils/error_templates');

const onceParameterRequired = (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        req.errors = req.errors || [];
        req.errors.push(toErrorFormat(
            {
              msg: onceParameterRequiredErrorMessage(),
              location: 'body'
            }
        ));
    }
    next();
}

module.exports = {
    onceParameterRequired
};