import type { Request, Response } from 'express';
import { StaffModel } from '../models/staffModel.js';

// Ito yung function para makuha ang listahan
export const getAllStaff = async (req: Request, res: Response) => {
  try {
    const staffs = await StaffModel.find();
    res.status(200).json(staffs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching staff data" });
  }
};

// Ito yung idadagdag natin para makapag-input via Postman
export const createStaff = async (req: Request, res: Response) => {
  try {
    const newStaff = new StaffModel(req.body);
    await newStaff.save();
    res.status(201).json(newStaff);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};