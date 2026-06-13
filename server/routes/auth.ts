import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';
import { config } from '../config.js';
import { authenticate } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { loginSchema, registerSchema } from '../validators/index.js';

const router = Router();

// Helper to select user fields — always exclude password from responses
const userSelect = {
  id: true,
  name: true,
  email: true,
  phone: true,
  email_verified_at: true,
  created_at: true,
  updated_at: true,
} as const;

/**
 * Generate a signed JWT for a given user ID.
 * Uses HS256 with an env-sourced secret; never logs the token.
 */
function generateToken(userId: number): string {
  return jwt.sign({ userId }, config.jwtSecret, {
    algorithm: 'HS256',
    expiresIn: config.jwtExpiresIn as unknown as jwt.SignOptions['expiresIn'],
  });
}

// ---------------------------------------------------------------------------
// POST /login
// ---------------------------------------------------------------------------
router.post('/login', authLimiter, async (req, res) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: parsed.error.errors[0]?.message ?? 'Validation failed',
        data: null,
      });
      return;
    }

    const { email, password } = parsed.data;

    // Fetch user including password hash for comparison
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Generic message — do not reveal whether the email exists
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
        data: null,
      });
      return;
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password',
        data: null,
      });
      return;
    }

    const token = generateToken(user.id);

    // Strip password before responding
    const { password: _password, ...safeUser } = user;
    void _password; // explicitly discard — never log or return

    res.json({
      success: true,
      message: 'Login successful',
      data: { user: safeUser, token },
    });
  } catch (error) {
    console.error('Login error:', error instanceof Error ? error.message : 'Unknown error');
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null,
    });
  }
});

// ---------------------------------------------------------------------------
// POST /register
// ---------------------------------------------------------------------------
router.post('/register', authLimiter, async (req, res) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: parsed.error.errors[0]?.message ?? 'Validation failed',
        data: null,
      });
      return;
    }

    const { name, email, password, phone } = parsed.data;

    // Check for duplicate email
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(409).json({
        success: false,
        message: 'Email already registered',
        data: null,
      });
      return;
    }

    // Hash password — DO NOT log the plaintext password
    const hashedPassword = await bcrypt.hash(password, config.bcryptRounds);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
      },
      select: userSelect,
    });

    const token = generateToken(user.id);

    // TODO(security): Consider OAuth providers for authentication
    // TODO(security): Consider MFA to strengthen account authentication
    // TODO(security): Consider leaked-password detection (e.g. HaveIBeenPwned API)

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: { user, token },
    });
  } catch (error) {
    console.error('Register error:', error instanceof Error ? error.message : 'Unknown error');
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null,
    });
  }
});

// ---------------------------------------------------------------------------
// POST /logout  (protected)
// ---------------------------------------------------------------------------
router.post('/logout', authenticate, (_req, res) => {
  // TODO(security): Implement token blacklist (e.g. Redis set with TTL matching
  // JWT expiration) to truly invalidate tokens on logout. Without this, the
  // JWT remains valid until it expires, which is a known JWT limitation.
  // TODO(security): Invalidate all active sessions when account is deleted/deactivated.

  res.json({
    success: true,
    message: 'Logged out successfully',
    data: null,
  });
});

// ---------------------------------------------------------------------------
// GET /me  (protected)
// ---------------------------------------------------------------------------
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: userSelect,
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        data: null,
      });
      return;
    }

    res.json({
      success: true,
      message: 'User retrieved',
      data: user,
    });
  } catch (error) {
    console.error('Get user error:', error instanceof Error ? error.message : 'Unknown error');
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null,
    });
  }
});

export default router;
