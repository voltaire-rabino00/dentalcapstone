import { AdminModel } from "../models/adminModel.js";
import { StaffModel } from "../models/staffModel.js";
import { PatientModel } from "../models/PatientModel.js";
import { type IUser } from "../types/UserTypes.js";

/**
 * Utility function upang hanapin ang user sa kahit alin sa tatlong collections (Patient, Staff, Admin)
 * Gamit ang Promise.all para sabay-sabay at mas mabilis ang query sa database.
 */
export async function findUserByEmail(email: string): Promise<IUser | null> {
  const normalizedEmail = email.toLowerCase(); // Laging gawing lowercase
  
  const [patient, staff, admin] = await Promise.all([
    PatientModel.findOne({ email: normalizedEmail }).select("+password"),
    StaffModel.findOne({ email: normalizedEmail }).select("+password"),
    AdminModel.findOne({ email: normalizedEmail }).select("+password"),
  ]);

  return patient || staff || admin;
}