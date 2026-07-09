import mongoose from "mongoose";

const CouponScherma = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            unique: true
        },
        status: {
            type: Boolean,
            trim: true,
            enum: "true"
        },
        action: {
            type: String,
            enum: ["percentage", "deduct"],
            trim: true
        },
        value: {
            type: Number,
            trim: true
        }
    },
    {
        collection: "coupon",
        timestamp: true
    }
)

export default mongoose.model("Coupon", CouponScherma)