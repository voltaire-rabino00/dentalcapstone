import type { Request, Response } from 'express';
import { StaffModel } from '../models/staffModel.js';

/**
 * @description Get all staff members
 */
export const getAllStaff = async (req: Request, res: Response) => {
  try {
    const staffs = await StaffModel.find();
    res.status(200).json(staffs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching staff data" });
  }
};

/**
 * @description Create a new staff member
 */
export const createStaff = async (req: Request, res: Response) => {
  try {
    const newStaff = new StaffModel(req.body);
    await newStaff.save();
    res.status(201).json(newStaff);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @description Update an existing staff member by ID
 */
export const updateStaff = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Binago natin ang options dito para mawala ang warning
    const updatedStaff = await StaffModel.findByIdAndUpdate(id, req.body, { 
      returnDocument: 'after', // Ito ang modern approach
      runValidators: true 
    });

    if (!updatedStaff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.status(200).json(updatedStaff);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @description Delete a staff member by ID
 */
export const deleteStaff = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedStaff = await StaffModel.findByIdAndDelete(id);

    if (!deletedStaff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.status(200).json({ message: "Staff deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Server error during deletion" });
  }
};