import { Router } from "express";
import { getAllStaff, createStaff } from "../controllers/StaffControllers.js";

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

export default router;