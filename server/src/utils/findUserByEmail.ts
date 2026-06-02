import { AdminModel } from "../models/adminModel.js";
import { StaffModel } from "../models/staffModel.js";
import { PatientModel } from "../models/PatientModel.js";
import { type IUser } from "../types/UserTypes.js";

/**
 * Utility function upang hanapin ang user sa kahit alin sa tatlong collections (Patient, Staff, Admin)
 * Gamit ang Promise.all para sabay-sabay at mas mabilis ang query sa database.
 */
export async function findUserByEmail(email: string): Promise<IUser | null> {
  const [patient, staff, admin] = await Promise.all([
    PatientModel.findOne({ email }).select("+password"),
    StaffModel.findOne({ email }).select("+password"),
    AdminModel.findOne({ email }).select("+password"),
  ]);

  return patient || staff || admin;
}