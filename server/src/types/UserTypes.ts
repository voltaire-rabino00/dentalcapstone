import { Document } from "mongoose";

export enum Role {
  Admin = "Admin",
  Dentist = "Dentist",
  Staff = "Staff",
  Patient = "Patient",
}

export interface IRegisterRequestBody {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface ILoginRequestBody {
  email: string;
  password: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}