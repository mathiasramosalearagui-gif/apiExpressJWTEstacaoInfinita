import productsControllers from "../controllers/productsControllers.js";
import express from "express"

const routes = express.Router()

routes.get("/products/featured", productsControllers.featureProducts)

export default routes