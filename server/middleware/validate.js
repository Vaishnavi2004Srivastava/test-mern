const AppError = require("../utils/AppError");

/**
 * Validation middleware factory for Zod schemas
 * @param {ZodSchema} schema - Zod schema to validate against
 * @param {String} source - 'body' or 'query'
 */
const validate = (schema, source = "body") => {
    return (req, res, next) => {
        const data = source === "body" ? req.body : req.query;
        const result = schema.safeParse(data);

        if (!result.success) {
            const errors = result.error.issues.map((issue) => {
                return issue.message;
            });
            return next(new AppError(errors.join(", "), 400));
        }

        // Replace with validated/sanitized data
        if (source === "body") {
            req.body = result.data;
        } else {
            req.query = result.data;
        }

        next();
    };
};

module.exports = validate;
