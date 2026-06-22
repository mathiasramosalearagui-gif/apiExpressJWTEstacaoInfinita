import userService from "../services/userServices.js";

const getMe = async (req, res, next) => {
    try {
        res.status(200).json({
            message: "User logged in successfully.",
            data: req.user
        })
    } catch (error) {
        next(error);
    }
}

export default {
    getMe
}