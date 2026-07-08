import adminControllers from "../controllers/adminControllers.js";
import express from "express";
import authMiddlewares from "../middlewares/authMiddleares.js";
import adminMiddlewares from "../middlewares/adminMiddlewares.js";

const router = express.Router()

router.get("/users", authMiddlewares, adminMiddlewares, adminControllers.listAllUsers)
router.get("/relatory", authMiddlewares, adminMiddlewares, adminControllers.relatory)
router.get("/products", authMiddlewares, adminMiddlewares, adminControllers.listProducts)
router.post("/products/new", authMiddlewares, adminMiddlewares, adminControllers.createProduct)
router.put("/products/:product", authMiddlewares, adminMiddlewares, adminControllers.updateProduct)
router.patch("/products/:product/desactive", authMiddlewares, adminMiddlewares, adminControllers.desactiveProduct)
router.patch("/products/:product/active", authMiddlewares, adminMiddlewares, adminControllers.activeProduct)
router.delete("/products/:product/deleted", authMiddlewares, adminMiddlewares, adminControllers.deleteProduct)
router.get("/sales", authMiddlewares, adminMiddlewares, adminControllers.getSales)
router.patch("/image/:product", authMiddlewares, adminMiddlewares, adminControllers.image)

export default router