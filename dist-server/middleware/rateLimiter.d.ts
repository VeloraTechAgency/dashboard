/**
 * Global rate limiter: 100 requests per 15-minute window.
 * Applied to all routes to prevent abuse.
 */
export declare const globalLimiter: import("express-rate-limit").RateLimitRequestHandler;
/**
 * Auth rate limiter: 10 requests per 15-minute window.
 * Applied to login/register routes to prevent brute-force attacks.
 */
export declare const authLimiter: import("express-rate-limit").RateLimitRequestHandler;
//# sourceMappingURL=rateLimiter.d.ts.map