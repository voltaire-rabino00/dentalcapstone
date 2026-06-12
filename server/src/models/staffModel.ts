import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { type IUser, Role } from "../types/UserTypes.js";

const SALT_ROUNDS = 12;

// Sa staffModel.ts
const StaffSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: [Role.Dentist, Role.Staff], required: true },
    
    // IDAGDAG MO ITO para lumabas sa table:
    idNo: { type: String }, 
    contact: { type: String },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  },
  { timestamps: true }
);

StaffSchema.pre("save", async function (this: any) {
  if (!this.isModified("password")) return;
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error: any) {
    throw new Error(error);
  }
});

StaffSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const StaffModel = model<IUser>("Staff", StaffSchema);