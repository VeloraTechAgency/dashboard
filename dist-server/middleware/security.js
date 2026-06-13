import helmet from 'helmet';
import cors from 'cors';
import { config } from '../config.js';
/**
 * Security headers via helmet.
 *
 * CSP directives:
 * - default-src 'self': only allow resources from same origin
 * - script-src 'self': only allow scripts from same origin
 * - style-src 'self' 'unsafe-inline': required for Tailwind CSS utility classes
 *   TODO(security): Consider using nonces for inline styles to remove 'unsafe-inline'
 * - img-src 'self' data: https:: allow images from same origin, data URIs, and HTTPS
 * - object-src 'none': block all plugins (Flash, Java, etc.)
 * - frame-ancestors 'none': prevent clickjacking (equivalent to X-Frame-Options: DENY)
 */
export const securityHeaders = helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", 'data:', 'https:'],
            objectSrc: ["'none'"],
            frameAncestors: ["'none'"],
        },
    },
    xFrameOptions: { action: 'deny' },
});
/**
 * CORS configuration.
 * Origin is sourced from config (environment variable) to avoid wildcard (*).
 */
export const corsMiddleware = cors({
    origin: config.corsOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
});
/**
 * Permissions-Policy header to disable unused browser features.
 * Reduces attack surface by preventing access to sensitive device APIs.
 */
export const permissionsPolicy = (_req, res, next) => {
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    next();
};
//# sourceMappingURL=security.js.map