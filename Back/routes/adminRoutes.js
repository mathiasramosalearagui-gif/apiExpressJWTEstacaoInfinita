import adminControllers from "../controllers/adminControllers.js";
import express from "express";
import authMiddlewares from "../middlewares/authMiddleares.js";

const router = express.Router()

router.get("/users", authMiddlewares, adminControllers.listAllUsers)

export default router