import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { type IUser, Role } from "../types/UserTypes.js";

const SALT_ROUNDS = 12;

const StaffSchema = new Schema<IUser>(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: [Role.Dentist, Role.Staff],
      required: [true, "Role is required"],
    },
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