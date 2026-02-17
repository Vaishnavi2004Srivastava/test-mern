const rateLimit = require("express-rate-limit");

/**
 * Global rate limiter for all API routes
 * 100 requests per 15 minutes per IP
 */
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        status: "error",
        message: "Too many requests from this IP, please try again later.",
    },
    standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
    legacyHeaders: false, // Disable `X-RateLimit-*` headers
});

/**
 * Strict rate limiter for POST requests (expense creation)
 * 10 requests per 1 minute per IP
 */
const strictLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // Limit each IP to 10 requests per windowMs
    message: {
        status: "error",
        message: "Too many expense creation requests, please slow down.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = {
    globalLimiter,
    strictLimiter,
};
