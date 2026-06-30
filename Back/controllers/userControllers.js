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

const updateMe = async (req, res, next) => {
    try {
        const user = await userService.updateMe(req.user._id, req.body)

        res.status(200).json({
            user,
            message: "Profile updated successfully",

        })
    } catch (error) {
        next(error)
    }
}

const historyMe = async (req, res, next) => {
    try {
        const historyUser = await userService.historyMe(req.user._id)
        res.json(historyUser)
    } catch (error) {
        next(error)
    }
}
const cartMe = async (req, res, next) => {
    try {
        const cartUser = await userService.cartMe(req.user, req.params.product)
        res.json(cartUser)
    } catch (error) {
        next(error)
    }
}
const meCart = async (req, res, next) => {
    try {
        const cartUser = await userService.meCart(req.user._id)
        res.json(cartUser)
    } catch (error) {
        next(error)
    }
}
const removeProduct = async (req, res, next) => {
    try {
        const cartUser = await userService.removeProduct(req.user._id, req.params.product)
        res.json(cartUser)
    } catch (error) {
        next(error)
    }
}

export default {
    getMe,
    updateMe,
    historyMe,
    cartMe,
    meCart,
    removeProduct
}