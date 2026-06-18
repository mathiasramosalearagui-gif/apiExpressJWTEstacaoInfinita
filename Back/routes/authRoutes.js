import authControllers from "../controllers/authControllers";
import express from "express";

const routes = express.Router()

routes.post("/register", authControllers.register)
routes.post("/login", authControllers.login)

export default routes