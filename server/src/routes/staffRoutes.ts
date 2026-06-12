import { Router } from "express";
import { getAllStaff, createStaff } from "../controllers/StaffControllers.js";

const router = Router();

router.get("/", getAllStaff);
router.post("/", createStaff);

export default router;