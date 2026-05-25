import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
import { type ILoginRequestBody, type IRegisterRequestBody } from "../types/UserTypes.js";

const JWT_SECRET = process.env.JWT_SECRET as string;

// ─── Register User ─────────────────────────────────────────────────────────────

export const registerUser = async (
  req: Request<{}, {}, IRegisterRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    // Check if a user with this email already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "An account with this email address already exists.",
      });
      return;
    }

    // Create and persist the new user (password hashed via pre-save hook)
    const newUser = await UserModel.create({ name, email, password, role });

    res.status(201).json({
      success: true,
      message: "Account registered successfully.",
      data: {
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      },
    });
  } catch (error) {
    console.error("[AuthController] registerUser error:", error);
    res.status(500).json({
      success: false,
      message: "An internal server error occurred. Please try again later.",
    });
  }
};

// ─── Login User ────────────────────────────────────────────────────────────────

export const loginUser = async (
  req: Request<{}, {}, ILoginRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user by email — explicitly select password for comparison
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
      return;
    }

    // Verify the provided password against the stored hash
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
      return;
    }

    // Sign JWT with user identity payload
    const tokenPayload = {
      id: user._id,
      name: user.name,
      role: user.role,
    };

    // Siguraduhing may secret key bago pumirma ng token para sa TS type safety
    if (!JWT_SECRET) {
      res.status(500).json({
        success: false,
        message: "JWT Secret configuration is missing on the server.",
      });
      return;
    }

    // DIREKTANG INILAGAY ANG "1d" PARA MAWALA ANG TYPE ERROR
    const token = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: "1d", 
    });

    res.status(200).json({
      success: true,
      message: "Login successful.",
      data: {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error("[AuthController] loginUser error:", error);
    res.status(500).json({
      success: false,
      message: "An internal server error occurred. Please try again later.",
    });
  }
};