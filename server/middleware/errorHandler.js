const AppError = require("../utils/AppError");

const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    // Development: send full error details
    if (process.env.NODE_ENV === "development") {
        console.error("ERROR", err);
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            stack: err.stack,
        });
    } else {
        // Production: send clean error messages
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        } else {
            // Programming or unknown errors: don't leak details
            console.error("ERROR", err);
            res.status(500).json({
                status: "error",
                message: "Something went wrong",
            });
        }
    }
};

module.exports = errorHandler;
