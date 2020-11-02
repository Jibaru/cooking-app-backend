const { validationResult } = require('express-validator');

/// Validate errors from validation schemas
const validateErrors = (req, res, next) => {

    const expressValidatorErrors = validationResult(req).array();
    const customErrors = req.errors || [];

    const allErrors = [...expressValidatorErrors, ...customErrors];

    if(allErrors.length > 0) {
        return res.status(400).json({
            ok: false,
            errors: allErrors
        });
    } else {
        next();
    }
}

module.exports = validateErrors;