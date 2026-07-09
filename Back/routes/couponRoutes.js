import couponControllers from "../controllers/couponControllers.js";
import express from "express"
import adminMiddleware from "../middlewares/adminMiddlewares.js";
import authMiddleware from "../middlewares/authMiddleares.js"

const routes = express.Router()

routes.post("/create", authMiddleware, adminMiddleware, couponControllers.createCoupon)
routes.put("/update/:coupon", authMiddleware, adminMiddleware, couponControllers.updateCoupon)
routes.patch("/desactive/:coupon", authMiddleware, adminMiddleware, couponControllers.desactiveCoupon)
routes.delete("/delete/:coupon", authMiddleware, adminMiddleware, couponControllers.deleteCoupon)
routes.get("/list", authMiddleware, adminMiddleware, couponControllers.getCoupons)

export default routes