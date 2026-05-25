import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { type IUser, Role } from "../types/UserTypes.js";

const SALT_ROUNDS = 12;

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
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
      enum: {
        values: Object.values(Role),
        message: `Role must be one of: ${Object.values(Role).join(", ")}`,
      },
      required: [true, "Role is required"],
    },
  },
  {
    timestamps: true,
  }
);

// ALTERNATIVE HOOK: Hindi na gumagamit ng 'next' callback. 
// Kapag async function, sapat na ang mag-return o mag-throw ng error.
UserSchema.pre("save", async function (this: any) {
  if (!this.isModified("password")) return;

  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error: any) {
    throw new Error(error);
  }
});

// Instance method: compare plain-text candidate with stored hash
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const UserModel = model<IUser>("User", UserSchema);

export default UserModel;