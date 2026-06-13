import { Router } from "express";
import { registerUser, loginUser } from "../controllers/AuthControllers.js";
import {
  registerValidationRules,
  loginValidationRules,
  handleValidationErrors,
} from "../middlewares/AuthValidators.js";

const router = Router();

/**
 * @route   POST /api/auth/register
 * @description Creates a new user account after validating the request payload.
 * @access  Public
 */
router.post(
  "/register",
  registerValidationRules,
  handleValidationErrors,
  registerUser
);

/**
 * @route   POST /api/auth/login
 * @description Authenticates a user and returns a JWT token.
 * @access  Public
 */
router.post(
  "/login",
  loginValidationRules,
  handleValidationErrors,
  loginUser
);

export default router;