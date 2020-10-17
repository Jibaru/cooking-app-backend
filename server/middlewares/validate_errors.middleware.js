const { validationResult } = require('express-validator');

/// Validate errors from validation schemas
const validateErrors = (req, res, next) => {
    
    const errors = validationResult(req).array();

    if(errors.length > 0) {
        return res.status(400).json({
            ok: false,
            errors
        });
    } else {
        next();
    }
}

module.exports = validateErrors;