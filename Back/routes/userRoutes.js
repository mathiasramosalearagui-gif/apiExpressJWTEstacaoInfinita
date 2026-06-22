import express from "express";
import userControllers from "../controllers/userControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me",authMiddleware, userControllers.getMe)

export default router;