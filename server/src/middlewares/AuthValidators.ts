import { type Request, type Response, type NextFunction } from "express"; // INAYOS: May 'type' keyword na lahat
import { body, validationResult, type ValidationChain } from "express-validator"; // INAYOS: May 'type' keyword ang ValidationChain
import { Role } from "../types/UserTypes.js"; // INAYOS: Pinalitan ng 'UserRole' at may .js extension

// Middleware para saluhin at i-return ang mga nakitang validation errors
export const handleValidationErrors = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({
        field: err.type === "field" ? err.path : err.type,
        message: err.msg,
      })),
    });
    return;
  }
  next();
};

// Register Validation Rules
export const registerValidationRules: ValidationChain[] = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),
  
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),
  
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  
  body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(Object.values(Role)) 
    .withMessage(`Role must be one of: ${Object.values(Role).join(", ")}`),
];

// Login Validation Rules
export const loginValidationRules: ValidationChain[] = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),
    
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty"),
];