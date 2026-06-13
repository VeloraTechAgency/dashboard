import type { RequestHandler } from 'express';
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
export declare const securityHeaders: RequestHandler;
/**
 * CORS configuration.
 * Origin is sourced from config (environment variable) to avoid wildcard (*).
 */
export declare const corsMiddleware: RequestHandler;
/**
 * Permissions-Policy header to disable unused browser features.
 * Reduces attack surface by preventing access to sensitive device APIs.
 */
export declare const permissionsPolicy: RequestHandler;
//# sourceMappingURL=security.d.ts.map