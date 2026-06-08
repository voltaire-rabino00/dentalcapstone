import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { type IUser, Role } from "../types/UserTypes.js";

const SALT_ROUNDS = 12;

const AdminSchema = new Schema<IUser>(
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
      enum: [Role.Admin],
      default: Role.Admin,
      required: [true, "Role is required"],
    },
  },
  { timestamps: true }
);

// Password hashing pre-save hook
AdminSchema.pre("save", async function (this: any) {
  if (!this.isModified("password")) return;
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error: any) {
    throw new Error(error);
  }
});

// Compare Password Instance method
AdminSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const AdminModel = model<IUser>("Admin", AdminSchema, 'admins');