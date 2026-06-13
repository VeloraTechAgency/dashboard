import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

/**
 * Resolves the JWT secret using a secure multi-tiered fallback:
 * 1. Environment variable (production)
 * 2. Local file jwt_secret.txt (development persistence across restarts)
 * 3. Ephemeral random generation (single-instance dev only)
 *
 * This ensures no hardcoded secret is ever committed to source code.
 */
function getJwtSecret(): string {
  // Tier 1: Environment variable (recommended for production via KMS / secret manager)
  if (process.env.JWT_SECRET) {
    return process.env.JWT_SECRET;
  }

  // Tier 2: Local file (useful for dev environments to persist across restarts)
  const secretPath = path.join(import.meta.dirname, '..', 'jwt_secret.txt');
  if (fs.existsSync(secretPath)) {
    const fileSecret = fs.readFileSync(secretPath, 'utf-8').trim();
    if (fileSecret.length > 0) {
      return fileSecret;
    }
  }

  // Tier 3: Ephemeral random secret (dev-only, instance-isolated)
  // TODO(security): In production, JWT_SECRET MUST be set via environment variable
  // or a secrets manager (e.g., AWS Secrets Manager, HashiCorp Vault).
  // Ephemeral secrets break horizontal scaling and token persistence across restarts.
  console.warn(
    'WARNING: Generating ephemeral JWT secret. ' +
    'This is instance-isolated and not suitable for production! ' +
    'Set JWT_SECRET environment variable for production deployments.'
  );
  return crypto.randomBytes(32).toString('hex');
}

export const config = {
  port: parseInt(process.env.PORT || '8090', 10),
  jwtSecret: getJwtSecret(),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  bcryptRounds: 12,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  databaseUrl: process.env.DATABASE_URL || 'file:./dev.db',
} as const;
