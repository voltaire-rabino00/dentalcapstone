import { Router } from "express";
import { getAllStaff, createStaff, updateStaff, deleteStaff } from "../controllers/StaffControllers.js";

const router = Router();

/**
 * @route   GET /api/staff
 * @description Retrieves all staff records.
 * @access  Private (Admin)
 */
router.get("/", getAllStaff);

/**
 * @route   POST /api/staff
 * @description Creates a new staff account.
 * @access  Private (Admin)
 */
router.post("/", createStaff);
router.put("/:id", updateStaff);    // Update route
router.delete("/:id", deleteStaff); // Delete route

export default router;