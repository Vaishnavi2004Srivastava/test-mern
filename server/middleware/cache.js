const NodeCache = require("node-cache");

// Create cache instance with 30 second TTL
const cache = new NodeCache({ stdTTL: 30, checkperiod: 40 });

/**
 * Cache middleware for GET requests
 * Caches responses based on full URL (including query params)
 */
const cacheMiddleware = (req, res, next) => {
    // Only cache GET requests
    if (req.method !== "GET") {
        return next();
    }

    const key = req.originalUrl || req.url;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
        console.log(`Cache HIT: ${key}`);
        return res.json(cachedResponse);
    }

    console.log(`Cache MISS: ${key}`);

    // Override res.json to cache the response
    const originalJson = res.json.bind(res);
    res.json = (body) => {
        cache.set(key, body);
        return originalJson(body);
    };

    next();
};

/**
 * Invalidate all cache entries
 */
const invalidateCache = () => {
    const keys = cache.keys();
    if (keys.length > 0) {
        cache.flushAll();
        console.log(`Cache invalidated (${keys.length} entries cleared)`);
    }
};

module.exports = { cacheMiddleware, invalidateCache };
