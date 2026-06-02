import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import { AdminModel } from "../models/adminModel.js";
import { StaffModel } from "../models/staffModel.js";
import { PatientModel } from "../models/PatientModel.js";
import { type ILoginRequestBody, type IRegisterRequestBody, Role } from "../types/UserTypes.js";
// 🎯 I-import ang ginawa nating utility helper
import { findUserByEmail } from "../utils/findUserByEmail.js";

const JWT_SECRET = process.env.JWT_SECRET as string;

// ─── Register User ─────────────────────────────────────────────────────────────

export const registerUser = async (
  req: Request<{}, {}, IRegisterRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password, role } = req.body;

    // 🎯 Gamit ang utility natin, isang tawag na lang para malaman kung may duplicate email
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "An account with this email address already exists.",
      });
      return;
    }

    let newUser;

    // Pagbubukod-bukod ng pag-save base sa pinadalang Role mula sa Postman
    if (role === Role.Admin) {
      newUser = await AdminModel.create({ name, email, password, role });
    } else if (role === Role.Dentist || role === Role.Staff) {
      newUser = await StaffModel.create({ name, email, password, role });
    } else if (role === Role.Patient) {
      newUser = await PatientModel.create({ name, email, password, role });
    } else {
      res.status(400).json({
        success: false,
        message: `Role must be one of: ${Object.values(Role).join(", ")}`,
      });
      return;
    }

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

    // 🎯 Isang mabilisang tawag na lang din gamit ang Promise.all utility natin!
    const user = await findUserByEmail(email);

    // Kung kahit saan sa tatlong collections ay walang nakaparehong email
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

    if (!JWT_SECRET) {
      res.status(500).json({
        success: false,
        message: "JWT Secret configuration is missing on the server.",
      });
      return;
    }

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