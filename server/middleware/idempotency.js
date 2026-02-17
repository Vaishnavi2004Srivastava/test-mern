const crypto = require("crypto");

/**
 * Idempotency middleware
 * Ensures duplicate requests (same idempotency key) return the same response
 */
const idempotency = (req, res, next) => {
    // Only apply to POST requests
    if (req.method !== "POST") {
        return next();
    }

    // Get or generate idempotency key
    let idempotencyKey = req.headers["x-idempotency-key"];

    if (!idempotencyKey) {
        // If client didn't provide one, generate it (for internal consistency)
        idempotencyKey = crypto.randomUUID();
    }

    // Store it in request for downstream use
    req.idempotencyKey = idempotencyKey;

    next();
};

module.exports = idempotency;
