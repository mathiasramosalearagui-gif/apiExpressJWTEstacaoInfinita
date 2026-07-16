import Coupon from "../models/Coupon.js";

const createCoupon = async (data) => {
    const { name, action, value } = data
    console.log(data)
    console.log(name)
    console.log(action)
    console.log(value)
    if (!name || !value || !action) {
        throw new Error("The name, action and value are must.")
    }

    return await Coupon.create(
        {
            name,
            action,
            value,
            status: true
        }
    )
}

const updateCoupon = async (couponId, data) => {
    const { action } = data
    console.log(data)
    if (action !== "percentage" && action !== "deduct") {
        throw new Error("The coupon is or percentage or deduct.")
    }

    const verifyCoupon = await Coupon.findOne({ name: couponId })

    const couponUpdated = await Coupon.findOneAndUpdate({ name: couponId }, data)
    if (!couponUpdated) {
        throw new Error("Not is possible update this coupon.")
    }

    return couponUpdated
}

const desactiveCoupon = async (couponId) => {
    const coupon = await Coupon.findById(couponId)
    if (!coupon) {
        throw new Error("The coupon dont find.")
    }

    if (!coupon.status) {
        throw new Error("The coupon ist available.")
    }

    coupon.status = false

    await coupon.save()

    return coupon
}

const activeCoupon = async (couponId) => {
    const coupon = await Coupon.findById(couponId)
    if (!coupon) {
        throw new Error("The coupon dont find.")
    }

    if (coupon.status) {
        throw new Error("The coupon is available.")
    }

    coupon.status = true

    await coupon.save()

    return coupon
}

const deleteCoupon = async (couponId) => {
    const coupon = await Coupon.findById(couponId)
    if (!coupon) {
        throw new Error("This coupon dont find.")
    }

    const deletedCoupon = await Coupon.findByIdAndDelete(couponId)
    if (!deletedCoupon) {
        throw new Error("The coupon cant am deleted.");
    }

    return deletedCoupon
}

const verifyAndAplicateCoupon = async (coupon, value) => {

    if (!coupon || !value) {
        throw new Error("Not is possible aplicate the coupon.")
    }
    console.log(coupon, value)

    const verifyCoupon = await Coupon.findOne({ name: coupon })
    if (!verifyCoupon) {
        throw new Error("The coupon dont find. Sorry.")
    }
    if (!verifyCoupon.status) {
        throw new Error("The coupon is dasctived. Call with team EI.")
    }

    if (verifyCoupon.action == "percentage") {
        let newValue = value - ((verifyCoupon.value / 100) * value)
        console.log((verifyCoupon.value / 100))
        console.log(newValue)
        return newValue
    } else if (verifyCoupon.action == "deduct") {
        let newValue = value - verifyCoupon.newValue
        console.log(newValue, "b")
        return newValue
    } else {
        throw new Error("The coupon is invalid.")
    }
}

const getCoupons = async () => {
    const coupons = await Coupon.find()
    if (!coupons) {
        throw new Error("Not find the coupons")
    }
    return coupons
}

export default {
    createCoupon,
    updateCoupon,
    desactiveCoupon,
    activeCoupon,
    deleteCoupon,
    verifyAndAplicateCoupon,
    getCoupons
}