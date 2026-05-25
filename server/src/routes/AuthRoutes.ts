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
 * @desc    Register a new user (Admin, Dentist, Staff, or Patient)
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
 * @desc    Authenticate a user and return a JWT
 * @access  Public
 */
router.post(
  "/login",
  loginValidationRules,
  handleValidationErrors,
  loginUser
);

export default router;