import rateLimit from 'express-rate-limit';
/**
 * Global rate limiter: 100 requests per 15-minute window.
 * Applied to all routes to prevent abuse.
 */
export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
    legacyHeaders: false, // Disable `X-RateLimit-*` headers
    message: { success: false, message: 'Too many requests, please try again later', data: null },
});
/**
 * Auth rate limiter: 10 requests per 15-minute window.
 * Applied to login/register routes to prevent brute-force attacks.
 */
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many auth attempts, please try again later', data: null },
});
//# sourceMappingURL=rateLimiter.js.map