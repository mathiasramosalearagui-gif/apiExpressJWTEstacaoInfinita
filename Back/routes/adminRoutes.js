import adminControllers from "../controllers/adminControllers.js";
import express from "express";
import authMiddlewares from "../middlewares/authMiddleares.js";

const router = express.Router()

router.get("/users", authMiddlewares, adminControllers.listAllUsers)
router.get("/relatory", authMiddlewares, adminControllers.relatory)
router.get("/products", authMiddlewares, adminControllers.listProducts)
router.post("/products/new", authMiddlewares, adminControllers.createProduct)
router.put("/products/:product", authMiddlewares, adminControllers.updateProduct)
router.patch("/products/:product/desactive", authMiddlewares, adminControllers.desactiveProduct)
router.patch("/products/:product/active", authMiddlewares, adminControllers.activeProduct)
router.delete("/products/:product/deleted", authMiddlewares, adminControllers.deleteProduct)

export default router