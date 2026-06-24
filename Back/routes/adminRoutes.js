import adminControllers from "../controllers/adminControllers.js";
import express from "express";
import authMiddlewares from "../middlewares/authMiddleares.js";

const router = express.Router()

router.get("/users", authMiddlewares, adminControllers.listAllUsers)
router.get("/relatory", authMiddlewares, adminControllers.relatory)
router.get("/products", authMiddlewares, adminControllers.listProducts)
router.post("/products/new", authMiddlewares, adminControllers.createProduct)
router.put("/products/:product", authMiddlewares, adminControllers.updateProduct)

export default router