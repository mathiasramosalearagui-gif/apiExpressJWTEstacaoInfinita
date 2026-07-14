import couponServices from "../services/couponServices.js";

const createCoupon = async (req, res, next) => {
    try {
        const coupon = await couponServices.createCoupon(req.body)
        res.json(
            {
                message: "Created successfully:",
                coupon
            }
        )
    } catch (error) {
        next(error)
    }
}

const updateCoupon = async (req, res, next) => {
    try {
        const coupon = await couponServices.updateCoupon(req.params.coupon, req.body)
        res.json(
            {
                message: "Successfully:",
                coupon
            }
        )
    } catch (error) {
        next(error)
    }
}

const desactiveCoupon = async (req, res, next) => {
    try {
        const information = await couponServices.desactiveCoupon(req.params.coupon)
        res.json(
            {
                message: "Successfully:",
                information
            }
        )
    } catch (error) {
        next(error)
    }
}

const activeCoupon = async (req, res, next) => {
    try {
        const information = await couponServices.activeCoupon(req.params.coupon)
        res.json({
            message: "Successfully:",
            information
        })
    } catch (error) {
        next(error)
    }
}

const deleteCoupon = async (req, res, next) => {
    try {
        const information = await couponServices.deleteCoupon(req.params.coupon)
        res.json(
            {
                message: "Succssfully:",
                information
            }
        )
    } catch (error) {
        next(error)
    }
}

const getCoupons = async (req, res, next) => {
    try {
        const information = await couponServices.getCoupons()
        res.json(
            {
                message: "Successfully:",
                information
            }
        )
    } catch (error) {
        next(error)
    }
}

export default {
    createCoupon,
    updateCoupon,
    desactiveCoupon,
    activeCoupon,
    deleteCoupon,
    getCoupons
}