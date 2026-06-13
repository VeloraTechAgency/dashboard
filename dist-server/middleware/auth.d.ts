import { Request, Response, NextFunction } from 'express';
declare global {
    namespace Express {
        interface Request {
            userId?: number;
        }
    }
}
/**
 * JWT authentication middleware.
 *
 * Security measures:
 * - Hardcoded HS256 algorithm to reject 'none' algorithm attacks
 * - Validates 'exp' claim automatically via jsonwebtoken defaults
 * - Secret sourced from environment (never hardcoded)
 *
 * TODO(security): Consider implementing token revocation / blacklist for logout
 * TODO(security): Consider using HttpOnly cookies instead of localStorage for token storage
 */
export declare function authenticate(req: Request, res: Response, next: NextFunction): void;
//# sourceMappingURL=auth.d.ts.map