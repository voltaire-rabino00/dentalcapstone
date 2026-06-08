import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import { AdminModel } from "../models/adminModel.js";
import { StaffModel } from "../models/staffModel.js";
import { PatientModel } from "../models/PatientModel.js";
import { type ILoginRequestBody, type IRegisterRequestBody, Role } from "../types/UserTypes.js";
import { findUserByEmail } from "../utils/findUserByEmail.js";

const JWT_SECRET = process.env.JWT_SECRET as string;

// ─── Register User ─────────────────────────────────────────────────────────────

export const registerUser = async (
  req: Request<{}, {}, IRegisterRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    // 1. SECURITY: I-disable ang public registration para sa Admin
    if (role === Role.Admin) {
      res.status(403).json({
        success: false,
        message: "Access Denied: Admin accounts cannot be created through public registration.",
      });
      return;
    }

    // 2. NORMALIZE EMAIL: Convert to lowercase to prevent duplicates (e.g. Admin@test.com vs admin@test.com)
    const normalizedEmail = email.toLowerCase();

    // 3. CHECK DUPLICATE
    const existingUser = await findUserByEmail(normalizedEmail);
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "An account with this email address already exists.",
      });
      return;
    }

    let newUser;

    // 4. SAVE BASE SA ROLE
    if (role === Role.Dentist || role === Role.Staff) {
      newUser = await StaffModel.create({ name, email: normalizedEmail, password, role });
    } else if (role === Role.Patient) {
      newUser = await PatientModel.create({ name, email: normalizedEmail, password, role });
    } else {
      res.status(400).json({
        success: false,
        message: `Invalid role. Must be one of: ${Object.values(Role).join(", ")}`,
      });
      return;
    }

    res.status(201).json({
      success: true,
      message: "Account registered successfully.",
      data: {
        user: { _id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role },
      },
    });
  } catch (error) {
    console.error("[AuthController] registerUser error:", error);
    res.status(500).json({
      success: false,
      message: "An internal server error occurred.",
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

    // I-normalize din ang email sa login para match sa database
    const user = await findUserByEmail(email.toLowerCase());

    if (!user) {
      res.status(401).json({ success: false, message: "Invalid email or password." });
      return;
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: "Invalid email or password." });
      return;
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful.",
      data: {
        token,
        user: { _id: user._id, name: user.name, email: user.email, role: user.role },
      },
    });
  } catch (error) {
    console.error("[AuthController] loginUser error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};