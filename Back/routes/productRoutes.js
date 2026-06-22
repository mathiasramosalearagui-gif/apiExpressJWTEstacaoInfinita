import productsControllers from "../controllers/productsControllers.js";
import express from "express"

const routes = express.Router()

routes.get("/featured", productsControllers.featureProducts)
routes.get("/list", productsControllers.listProducts)
routes.get("", productsControllers.filterProducts)
export default routes