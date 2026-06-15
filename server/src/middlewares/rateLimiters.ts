import rateLimit from 'express-rate-limit';

// Global limiter para sa lahat ng requests
export const globalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later.' },
});

// Login Limiter (Mas mahigpit)
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Ginawa nating 5 attempts
  skipSuccessfulRequests: true, // HINDI mabibilang ang tama ang password
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      success: false,
      message: 'Too many failed login attempts. Please try again after 15 minutes.',
    });
  },
});

// Register Limiter
export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json({
      success: false,
      message: 'Registration limit reached. Please try again in an hour.',
    });
  },
});