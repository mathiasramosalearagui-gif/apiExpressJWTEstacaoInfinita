import express from "express";
import userControllers from "../controllers/userControllers.js";
import authMiddleware from "../middlewares/authMiddleares.js";

const router = express.Router();

router.get("/me", authMiddleware, userControllers.getMe)
router.put("/me", authMiddleware, userControllers.updateMe)
router.get("/me/history", authMiddleware, userControllers.historyMe)
router.get("/me/cart" ,authMiddleware, userControllers.cartMe)

export default router;