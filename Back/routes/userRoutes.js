import express from "express";
import userControllers from "../controllers/userControllers.js";
import authMiddleware from "../middlewares/authMiddleares.js";

const router = express.Router();

router.get("/me", authMiddleware, userControllers.getMe)
router.put("/me", authMiddleware, userControllers.updateMe)

export default router;