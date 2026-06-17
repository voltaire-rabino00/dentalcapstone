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

    if (role === Role.Admin) {
      res.status(403).json({ success: false, message: "Access Denied." });
      return;
    }

    const normalizedEmail = email.toLowerCase();
    const existingUser = await findUserByEmail(normalizedEmail);
    if (existingUser) {
      res.status(400).json({ success: false, message: "Email already exists." });
      return;
    }

    let newUser;
    if (role === Role.Dentist || role === Role.Staff) {
      newUser = await StaffModel.create({ name, email: normalizedEmail, password, role });
    } else if (role === Role.Patient) {
      newUser = await PatientModel.create({ name, email: normalizedEmail, password, role });
    } else {
      res.status(400).json({ success: false, message: "Invalid role." });
      return;
    }

    res.status(201).json({ success: true, message: "Registered successfully." });
  } catch (error) {
    console.error("[AuthController] registerUser error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

// ─── Login User (Password) ──────────────────────────────────────────────────────
export const loginUser = async (
  req: Request<{}, {}, ILoginRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email.toLowerCase());

    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ success: false, message: "Invalid email or password." });
      return;
    }

    const token = jwt.sign({ id: user._id, name: user.name, role: user.role }, JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({
      success: true,
      message: "Login successful.",
      data: { token, user: { _id: user._id, name: user.name, email: user.email, role: user.role } },
    });
  } catch (error) {
    console.error("[AuthController] loginUser error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// ─── Staff QR Login ─────────────────────────────────────────────────────────────
export const loginStaffWithQR = async (req: Request, res: Response): Promise<void> => {
  try {
    const { qrToken } = req.body;
    
    // Hanapin ang staff gamit ang QR (dito ang logic mo)
    const staff = await StaffModel.findById(qrToken);
    
    if (!staff) {
      res.status(401).json({ success: false, message: "Invalid QR Code." });
      return;
    }

    const token = jwt.sign({ id: staff._id, role: staff.role }, JWT_SECRET, { expiresIn: "1d" });
    
    res.status(200).json({ 
      success: true, 
      data: { 
        token, 
        user: { 
          _id: staff._id, 
          name: staff.name, 
          isActivated: (staff as any).isActivated // Siguraduhin na may field ka na ganito sa Schema
        } 
      } 
    });
  } catch (error) {
    console.error("[AuthController] loginStaffWithQR error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};