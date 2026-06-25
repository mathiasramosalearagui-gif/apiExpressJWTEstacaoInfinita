import authService from "../services/authService.js";

const register = async (req, res, next) => {
    try {
        const user = await authService.register(req.body)
        res.status(201).json(
            {
                message: "User registered successfully.",
                data: user
            }
        )
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const user = await authService.login(req.body)
        res.status(201).json(
            {
                message: "User logged successfully.",
                data: user
            }
        )
    } catch (error) {
        next(error)
    }
}

export default {
    register,
    login
}