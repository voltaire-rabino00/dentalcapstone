import { Document } from "mongoose";

/**
 * Centralized user roles used throughout the application
 * for authorization and access control.
 */
export enum Role {
  Admin = "Admin",
  Dentist = "Dentist",
  Staff = "Staff",
  Patient = "Patient",
}

/**
 * Request payload for user registration.
 */
export interface IRegisterRequestBody {
  name: string;
  email: string;
  password: string;
  role: Role;
}

/**
 * Request payload for user authentication.
 */
export interface ILoginRequestBody {
  email: string;
  password: string;
}

/**
 * Base user contract shared across Admin, Staff, Dentist,
 * and Patient collections.
 */
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;

  createdAt: Date;
  updatedAt: Date;

  /**
   * Optional fields that may only exist
   * for specific user types.
   */
  idNo?: string;
  contact?: string;
  status?: "Active" | "Inactive";

  /**
   * Compares a plain-text password against
   * the stored hashed password.
   */
  comparePassword(candidatePassword: string): Promise<boolean>;
}