import { Router } from "express";
import { registerUser, loginUser } from "../controllers/AuthControllers.js";
import {
  registerValidationRules,
  loginValidationRules,
  handleValidationErrors,
} from "../middlewares/AuthValidators.js";
import { loginLimiter, registerLimiter } from '../middlewares/rateLimiters.js';

const router = Router();

/**
 * @route   POST /api/auth/register
 */
router.post(
  "/register",
  registerLimiter, // Dito naka-attach ang register limiter
  registerValidationRules,
  handleValidationErrors,
  registerUser
);

/**
 * @route   POST /api/auth/login
 */
router.post(
  "/login",
  loginLimiter, // Dito naka-attach ang login limiter
  loginValidationRules,
  handleValidationErrors,
  loginUser
);

export default router;