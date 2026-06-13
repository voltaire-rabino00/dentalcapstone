import { AdminModel } from "../models/adminModel.js";
import { StaffModel } from "../models/staffModel.js";
import { PatientModel } from "../models/PatientModel.js";
import { type IUser } from "../types/UserTypes.js";

/**
 * Searches for a user across all authentication collections.
 *
 * Notes:
 * - Email is normalized to lowercase to ensure case-insensitive lookups.
 * - Queries are executed in parallel using Promise.all to reduce response time.
 * - Password is explicitly selected because it is excluded by default
 *   and is required during authentication.
 *
 * Returns the first matching user document, otherwise null.
 */
export async function findUserByEmail(email: string): Promise<IUser | null> {
  // Normalize email to match the format stored in the database.
  const normalizedEmail = email.toLowerCase();

  const [patient, staff, admin] = await Promise.all([
    PatientModel.findOne({ email: normalizedEmail }).select("+password"),
    StaffModel.findOne({ email: normalizedEmail }).select("+password"),
    AdminModel.findOne({ email: normalizedEmail }).select("+password"),
  ]);

  // Return the first matching user regardless of role.
  return patient || staff || admin;
}