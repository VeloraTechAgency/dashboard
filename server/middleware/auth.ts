import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

// Extend Express Request to include authenticated user info
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
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
export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Unauthorized', data: null });
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ success: false, message: 'Unauthorized', data: null });
    return;
  }

  try {
    // Hardcode algorithms to ['HS256'] to prevent algorithm confusion attacks
    const decoded = jwt.verify(token, config.jwtSecret, {
      algorithms: ['HS256'],
    }) as { userId: number; exp: number };

    if (!decoded.userId || typeof decoded.userId !== 'number') {
      res.status(401).json({ success: false, message: 'Invalid token payload', data: null });
      return;
    }

    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Invalid or expired token', data: null });
  }
}
