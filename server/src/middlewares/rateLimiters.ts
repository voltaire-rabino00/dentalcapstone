import rateLimit from 'express-rate-limit';

/**
 * Rate limiter for authentication attempts.
 * Counts failed login attempts only.
 */
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  skipSuccessfulRequests: true,
  message: {
    success: false,
    message: 'Too many failed login attempts. Please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate limiter for account registration.
 * Helps prevent account creation abuse and spam.
 */
export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: {
    success: false,
    message: 'Account registration limit reached. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Global API rate limiter.
 * Protects the server against excessive requests.
 */
export const globalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100,
  message: {
    success: false,
    message: 'Too many requests. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});