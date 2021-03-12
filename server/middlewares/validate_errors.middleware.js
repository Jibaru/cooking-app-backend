const { validationResult } = require("express-validator");
const { clientError } = require("../utils/http_status_codes");
const { fromExpressValidator } = require("../utils/error_formatter");

/// Validate errors from validation schemas
const validateErrors = (req, res, next) => {
  const expressValidatorErrors = validationResult(req)
    .array()
    .map((error) => fromExpressValidator(error));
  const customErrors = req.errors || [];

  const allErrors = [...expressValidatorErrors, ...customErrors];

  if (allErrors.length > 0) {
    return res.status(clientError.badRequest).json({
      ok: false,
      errors: allErrors,
    });
  } else {
    next();
  }
};

module.exports = validateErrors;
